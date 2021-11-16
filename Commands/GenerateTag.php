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

class GenerateTag extends GeneratePluginBase
{
    protected function configure()
    {
        $this->setName('generate:tagmanager-tag');
        $this->setDescription('Generate Tag');
        $this->addOption('pluginname', null, InputOption::VALUE_REQUIRED, 'The name of an existing plugin');
        $this->addOption('tagname', null, InputOption::VALUE_REQUIRED, 'The name of the tag you want to create');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $pluginName = $this->getPluginName($input, $output);
        $this->checkAndUpdateRequiredPiwikVersion($pluginName, $output);

        $tagName = $this->getTagName($input, $output);
        $tagId = str_replace(array('-', ' '), '', $tagName);
        $tagClass = $tagId . 'Tag';

        $exampleFolder  = PIWIK_INCLUDE_PATH . '/plugins/TagManager';
        $replace        = array(
            'TagManager' => $pluginName,
            'CustomImage' => $tagId,
            'customImage' => lcfirst($tagId),
            'Custom Image' => $tagName,
            'Piwik\Plugins\\' .$pluginName. '\Template\Tag\BaseTag' => 'Piwik\Plugins\TagManager\Template\Tag\BaseTag',
            'parameters, ' . $pluginName => 'parameters, TagManager'
        );
        $whitelistFiles = array(
            '/Template',
            '/Template/Tag',
            '/Template/Tag/CustomImageTag.php',
            '/Template/Tag/CustomImageTag.web.js',
        );

        $this->copyTemplateToPlugin($exampleFolder, $pluginName, $replace, $whitelistFiles);

        $this->makeTranslationIfPossible($pluginName, $tagName, $tagClass . 'Name');
        $this->makeTranslationIfPossible($pluginName, "This is the description for " . $tagName, $tagClass . 'Description');
        $this->makeTranslationIfPossible($pluginName, "", $tagClass . 'Help');

        $this->writeSuccessMessage($output, array(
            sprintf('Tag for %s in folder "plugins/%s/Template/Tag" generated.', $pluginName, $pluginName),
            'You can now start implementing the tag',
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
    private function getTagName(InputInterface $input, OutputInterface $output)
    {
        $tagName = $input->getOption('tagname');

        $validate = function ($testname) {
            if (empty($testname)) {
                throw new \InvalidArgumentException('You have to enter a tag name');
            }

            if (preg_match("/^[0-9]/", $testname)) {
                throw new \InvalidArgumentException('The tag name may not start with a number.');
            }

            if (preg_match("/[^A-Za-z0-9 -]/", $testname)) {
                throw new \InvalidArgumentException('Only alpha numerical characters, whitespaces, and dashes are allowed as a tag name.');
            }

            return $testname;
        };

        if (empty($tagName)) {
            $dialog   = $this->getHelperSet()->get('dialog');
            $tagName = $dialog->askAndValidate($output, 'Enter the name of the tag (CamelCase): ', $validate);
        } else {
            $validate($tagName);
        }

        $tagName = ucfirst($tagName);

        return $tagName;
    }

    protected function getPluginName(InputInterface $input, OutputInterface $output)
    {
        $pluginNames = $this->getPluginNames();
        $invalidName = 'You have to enter the name of an existing plugin';

        return $this->askPluginNameAndValidate($input, $output, $pluginNames, $invalidName);
    }
}
