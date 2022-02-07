<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Commands;


use Piwik\Plugins\CoreConsole\Commands\GeneratePluginBase;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;


class GenerateTrigger extends GeneratePluginBase
{
    protected function configure()
    {
        $this->setName('generate:tagmanager-trigger');
        $this->setDescription('Generate Trigger');
        $this->addOption('pluginname', null, InputOption::VALUE_REQUIRED, 'The name of an existing plugin');
        $this->addOption('triggername', null, InputOption::VALUE_REQUIRED, 'The name of the trigger you want to create');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $pluginName = $this->getPluginName($input, $output);
        $this->checkAndUpdateRequiredPiwikVersion($pluginName, $output);

        $triggerName = $this->getTriggerName($input, $output);
        $triggerId = str_replace(array('-', ' '), '', $triggerName);
        $triggerClass = $triggerId . 'Trigger';

        $exampleFolder  = PIWIK_INCLUDE_PATH . '/plugins/TagManager';
        $replace        = array(
            'TagManager' => $pluginName,
            'DomReady' => $triggerId,
            'Piwik\Plugins\\' .$pluginName. '\Template\Trigger\BaseTrigger' => 'Piwik\Plugins\TagManager\Template\Trigger\BaseTrigger',
            'parameters, ' . $pluginName => 'parameters, TagManager'
        );
        $whitelistFiles = array(
            '/Template',
            '/Template/Trigger',
            '/Template/Trigger/DomReadyTrigger.php',
            '/Template/Trigger/DomReadyTrigger.web.js'
        );

        $this->copyTemplateToPlugin($exampleFolder, $pluginName, $replace, $whitelistFiles);

        $this->makeTranslationIfPossible($pluginName, $triggerName, $triggerClass . 'Name');
        $this->makeTranslationIfPossible($pluginName, "This is the description for " . $triggerName, $triggerClass . 'Description');
        $this->makeTranslationIfPossible($pluginName, "", $triggerClass . 'Help');

        $this->writeSuccessMessage($output, array(
            sprintf('Trigger for %s in folder "plugins/%s/Template/Trigger" generated.', $pluginName, $pluginName),
            'You can now start implementing the trigger',
            'Enjoy!'
        ));

        return 0;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return string
     * @throws \RuntimeException
     */
    private function getTriggerName(InputInterface $input, OutputInterface $output)
    {
        $triggerName = $input->getOption('triggername');

        $validate = function ($testname) {
            if (empty($testname)) {
                throw new \InvalidArgumentException('You have to enter a trigger name');
            }

            if (preg_match("/^[0-9]/", $testname)) {
                throw new \InvalidArgumentException('The trigger name may not start with a number.');
            }

            if (preg_match("/[^A-Za-z0-9 -]/", $testname)) {
                throw new \InvalidArgumentException('Only alpha numerical characters, whitespaces, and dashes are allowed as a trigger name.');
            }

            return $testname;
        };

        if (empty($triggerName)) {
            $dialog   = $this->getHelperSet()->get('dialog');
            $triggerName = $dialog->askAndValidate($output, 'Enter the name of the trigger (CamelCase): ', $validate);
        } else {
            $validate($triggerName);
        }

        $triggerName = ucfirst($triggerName);

        return $triggerName;
    }

    protected function getPluginName(InputInterface $input, OutputInterface $output)
    {
        $pluginNames = $this->getPluginNames();
        $invalidName = 'You have to enter the name of an existing plugin';

        return $this->askPluginNameAndValidate($input, $output, $pluginNames, $invalidName);
    }
}
