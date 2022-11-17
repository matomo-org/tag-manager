<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Model;

use Piwik\Piwik;
use Piwik\Plugins\TagManager\API\TagReference;
use Piwik\Plugins\TagManager\API\TriggerReference;
use Piwik\Plugins\TagManager\API\VariableReference;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Plugins\TagManager\Input\IdSite;
use Piwik\Plugins\TagManager\Validators\LookupTable;
use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\Template\BaseTemplate;
use Piwik\Plugins\TagManager\Template\Variable\VariablesProvider;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\BaseValidator;
use Piwik\Validators\CharacterLength;

class Variable extends BaseModel
{
    /**
     * @var VariablesDao
     */
    private $dao;

    /**
     * @var VariablesProvider
     */
    private $variablesProvider;

    /**
     * @var Tag
     */
    private $tag;

    /**
     * @var Trigger
     */
    private $trigger;

    public function __construct(VariablesDao $variablesDao, VariablesProvider $variablesProvider, Tag $tag, Trigger $trigger)
    {
        $this->dao = $variablesDao;
        $this->variablesProvider = $variablesProvider;
        $this->tag = $tag;
        $this->trigger = $trigger;
    }

    private function validateValues($idSite, $name, $defaultValue, $lookupTable)
    {
        $site = new IdSite($idSite);
        $site->check();

        $theName = new Name($name);
        $theName->check();

        if ($this->variablesProvider->getPreConfiguredVariable($name)) {
            throw new \Exception(Piwik::translate('TagManager_ErrorVariableNameInUseByPreconfiguredVariable'));
        }

        if (isset($defaultValue) && !is_string($defaultValue) && !is_int($defaultValue) && !is_float($defaultValue) && !is_bool($defaultValue)) {
            throw new \Exception(Piwik::translate('TagManager_ErrorVariableInvalidDefaultValue'));
        }

        BaseValidator::check(Piwik::translate('TagManager_DefaultValue'), $lookupTable, [new CharacterLength(0, 300)]);
        BaseValidator::check(Piwik::translate('TagManager_LookupTable'), $lookupTable, [new LookupTable()]);
    }

    public function addContainerVariable($idSite, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable, $description = '')
    {
        $this->validateValues($idSite, $name, $defaultValue, $lookupTable);
        $this->variablesProvider->checkIsValidVariable($type);
        $createdDate = $this->getCurrentDateTime();
        $parameters = $this->formatParameters($type, $parameters);
        return $this->dao->createVariable($idSite, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable, $createdDate, $description);
    }

    public function updateContainerVariable($idSite, $idContainerVersion, $idVariable, $name, $parameters, $defaultValue, $lookupTable, $description = '')
    {
        $this->validateValues($idSite, $name, $defaultValue, $lookupTable);
        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        if (!empty($variable)) {
            $parameters = $this->formatParameters($variable['type'], $parameters);
            $columns = array(
                'name' => $name,
                'description' => $description,
                'default_value' => $defaultValue,
                'lookup_table' => $lookupTable,
                'parameters' => $parameters
            );
            $this->updateVariableColumns($idSite, $idContainerVersion, $idVariable, $columns);
            if ($variable['name'] !== $name) {
                $this->updateContainerVariableReferences($idSite, $idContainerVersion, $variable['name'], $name);
            }
        }
    }

    private function formatParameters($variableType, $parameters)
    {
        $variableTemplate = $this->variablesProvider->getVariable($variableType);
        if (empty($variableTemplate)) {
            throw new \Exception('Invalid variable type');
        }

        $params = $variableTemplate->getParameters();

        // we make sure to only save parameters that are defined in the tag template
        $newParameters = [];
        foreach ($params as $param) {
            if (isset($parameters[$param->getName()])) {
                $param->setValue($parameters[$param->getName()]);
                $newParameters[$param->getName()] = $param->getValue();
            } else {
                // we need to set a value to make sure that if for example a value is required, we trigger an error
                $param->setValue($param->getDefaultValue());
            }
        }

        return $newParameters;
    }

    public function getContainerVariableReferences($idSite, $idContainerVersion, $idVariable)
    {
        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);

        if (empty($variable)) {
            return [];
        }

        $varName = $variable['name'];

        $references = [];
        $tags = $this->tag->getContainerTags($idSite, $idContainerVersion);
        $triggers = $this->trigger->getContainerTriggers($idSite, $idContainerVersion);
        $variables = $this->getContainerVariables($idSite, $idContainerVersion);

        foreach ($tags as $tag) {
            foreach ($tag['typeMetadata']['parameters'] as $parameter) {
                if ($this->isUsingParameterTheVariable($parameter, $varName)) {
                    $tagRef = new TagReference($tag['idtag'], $tag['name']);
                    $references[] = $tagRef->toArray();
                }
            }
        }
        foreach ($triggers as $trigger) {
            foreach ($trigger['typeMetadata']['parameters'] as $parameter) {
                if ($this->isUsingParameterTheVariable($parameter, $varName)) {
                    $triggerRef = new TriggerReference($trigger['idtrigger'], $trigger['name']);
                    $references[] = $triggerRef->toArray();
                    continue 2; // not needed to check for condition reference
                }
            }

            foreach ($trigger['conditions'] as $condition) {
                if ($condition['actual'] === $varName) {
                    $triggerRef = new TriggerReference($trigger['idtrigger'], $trigger['name']);
                    $references[] = $triggerRef->toArray();
                }
            }
        }

        foreach ($variables as $var) {
            foreach ($var['typeMetadata']['parameters'] as $parameter) {
                if ($this->isUsingParameterTheVariable($parameter, $varName)) {
                    $variableRef = new VariableReference($var['idvariable'], $var['name']);
                    $references[] = $variableRef->toArray();
                }
            }
        }

        return $references;
    }

    public static function hasFieldConfigVariableParameter($parameter)
    {
        if (!empty($parameter['templateFile']) &&
            ($parameter['templateFile'] === BaseTemplate::FIELD_TEMPLATE_VARIABLE
                || $parameter['templateFile'] === BaseTemplate::FIELD_TEMPLATE_TEXTAREA_VARIABLE
                || $parameter['templateFile'] === BaseTemplate::FIELD_TEMPLATE_VARIABLE_TYPE)) {
            return true;
        }

        if (!empty($parameter['component'])
            && ($parameter['component'] === BaseTemplate::FIELD_TEXTAREA_VARIABLE_COMPONENT
                || $parameter['component'] === BaseTemplate::FIELD_VARIABLE_COMPONENT
                || $parameter['component'] === BaseTemplate::FIELD_VARIABLE_TYPE_COMPONENT)
        ) {
            return true;
        }

        if (!empty($parameter['uiControl']) && $parameter['uiControl'] === FieldConfig::UI_CONTROL_MULTI_TUPLE) {
            if (!empty($parameter['uiControlAttributes']['field1']) && self::hasFieldConfigVariableParameter($parameter['uiControlAttributes']['field1'])) {
                return true;
            }
            if (!empty($parameter['uiControlAttributes']['field2']) && self::hasFieldConfigVariableParameter($parameter['uiControlAttributes']['field2'])) {
                return true;
            }
        }
        if (!empty($parameter['uiControlAttributes']['parseVariables'])) {
            // workaround for some variables that don't use above templates but still need to be parsed
            return true;
        }
        return false;
    }

    private function isUsingParameterTheVariable($parameter, $varName)
    {
        $varNameTemplate = $this->convertVariableNameToTemplateVar($varName);

        if (!self::hasFieldConfigVariableParameter($parameter)) {
            return false;
        }

        if (is_string($parameter['value'])) {
            $value = $parameter['value'];
        } elseif (is_array($parameter['value'])) {
            // todo: in theory, when using a MultiTuple field where 2 fields can be configured, we would need to check
            // whether both or only one of the fields are using variables and then iterate over all values to only
            // check the values for that specific object key/field. Eg array(array('index' => '{{foo}}', 'bar' => '{{baz}}'))
            // in theory it is possible that "index" key is a variable, but "bar" key is not and actually the user entered that text

            // simplify when the value has an array instead of iterating over everything...
            $value = json_encode($parameter['value']);
        } else {
            // we do not support objects or resources... and an integer or boolean etc cannot contain a variable
            return false;
        }

        return strpos($value, $varNameTemplate) !== false;
    }

    private function updateContainerVariableReferences($idSite, $idContainerVersion, $oldVarName, $newVarName)
    {
        $tags = $this->tag->getContainerTags($idSite, $idContainerVersion);
        $triggers = $this->trigger->getContainerTriggers($idSite, $idContainerVersion);
        $variables = $this->getContainerVariables($idSite, $idContainerVersion);

        foreach ($tags as $tag) {
            $parameters = $this->replaceVariableNameInParameters($tag, $oldVarName, $newVarName);
            if ($parameters) {
                $this->tag->updateParameters($idSite, $idContainerVersion, $tag['idtag'], $parameters);
            }
        }

        foreach ($triggers as $trigger) {
            $parameters = $this->replaceVariableNameInParameters($trigger, $oldVarName, $newVarName);

            $found = false;
            foreach ($trigger['conditions'] as $index => $condition) {
                if (isset($condition['actual']) && $condition['actual'] === $oldVarName) {
                    $found = true;
                    $condition['actual'] = $newVarName;
                    $trigger['conditions'][$index] = $condition;
                }
            }
            if ($parameters || $found) {
                $this->trigger->updateContainerTrigger($idSite, $idContainerVersion, $trigger['idtrigger'], $trigger['name'], $parameters, $trigger['conditions']);
            }
        }

        foreach ($variables as $variable) {
            $parameters = $this->replaceVariableNameInParameters($variable, $oldVarName, $newVarName);
            if ($parameters) {
                $this->updateVariableColumns($idSite, $idContainerVersion, $variable['idvariable'], array(
                    'parameters' => $parameters
                ));
            }
        }
    }

    private function replaceVariableNameInParameters($entity, $oldVarName, $newVarName)
    {
        $oldVarNameTemplate = $this->convertVariableNameToTemplateVar($oldVarName);
        $newVarNameTemplate = $this->convertVariableNameToTemplateVar($newVarName);

        $found = false;

        $parameters = $entity['parameters'];
        foreach ($entity['typeMetadata']['parameters'] as $parameter) {
            $paramName = $parameter['name'];
            if (($parameter['templateFile'] === BaseTemplate::FIELD_TEMPLATE_VARIABLE
                    || (isset($parameter['component'])
                        && in_array($parameter['component'], [BaseTemplate::FIELD_VARIABLE_COMPONENT, BaseTemplate::FIELD_VARIABLE_TYPE_COMPONENT])))
                && isset($parameters[$paramName])
                && is_string($parameters[$paramName])
                && strpos($parameters[$paramName], $oldVarNameTemplate) !== false) {
                $found = true;
                $parameters[$paramName] = str_replace($oldVarNameTemplate, $newVarNameTemplate, $parameters[$paramName]);
            }
        }
        if ($found) {
            return $parameters;
        }
    }

    public function convertVariableNameToTemplateVar($variableName)
    {
        return '{{' . $variableName . '}}';
    }

    public function getContainerVariables($idSite, $idContainerVersion)
    {
        $variables = $this->dao->getContainerVariables($idSite, $idContainerVersion);
        return $this->enrichVariables($variables);
    }

    public function deleteContainerVariable($idSite, $idContainerVersion, $idVariable)
    {
        if ($this->getContainerVariableReferences($idSite, $idContainerVersion, $idVariable)) {
            throw new \Exception('This variable cannot be deleted as it is used in other places. To remove this variable, first remove all places where this variable is used');
        }
        $this->dao->deleteContainerVariable($idSite, $idContainerVersion, $idVariable, $this->getCurrentDateTime());
    }

    public function getContainerVariable($idSite, $idContainerVersion, $idVariable)
    {
        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        return $this->enrichVariable($variable);
    }

    public function findVariableByName($idSite, $idContainerVersion, $variableName)
    {
        $variable = $this->dao->findVariableByName($idSite, $idContainerVersion, $variableName);
        return $this->enrichVariable($variable);
    }

    private function updateVariableColumns($idSite, $idContainerVersion, $idVariable, $columns)
    {
        if (!isset($columns['updated_date'])) {
            $columns['updated_date'] = $this->getCurrentDateTime();
        }
        $this->dao->updateVariableColumns($idSite, $idContainerVersion, $idVariable, $columns);
    }

    private function enrichVariables($variables)
    {
        if (empty($variables)) {
            return array();
        }

        foreach ($variables as $index => $variable) {
            $variables[$index] = $this->enrichVariable($variable);
        }

        return $variables;
    }

    private function enrichVariable($variable)
    {
        if (empty($variable)) {
            return $variable;
        }

        $variable['created_date_pretty'] = $this->formatDate($variable['created_date'], $variable['idsite']);
        $variable['updated_date_pretty'] = $this->formatDate($variable['updated_date'], $variable['idsite']);

        unset($variable['deleted_date']);
        $variable['typeMetadata'] = null;
        if (empty($variable['parameters'])) {
            $variable['parameters'] = array();
        }

        $variableTemplate = $this->variablesProvider->getVariable($variable['type']);

        if (!empty($variableTemplate)) {
            $variable['typeMetadata'] = $variableTemplate->toArray();
            foreach ($variable['typeMetadata']['parameters'] as &$parameter) {
                $paramName = $parameter['name'];
                if (isset($variable['parameters'][$paramName])) {
                    $parameter['value'] = $variable['parameters'][$paramName];
                } else {
                    $variable['parameters'][$paramName] = $parameter['defaultValue'];
                }
            }
        }

        return $variable;
    }

}

