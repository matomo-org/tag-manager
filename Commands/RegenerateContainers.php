<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Commands;

use Piwik\Piwik;
use Piwik\Plugin\ConsoleCommand;
use Symfony\Component\Console\Input\InputOption;

class RegenerateContainers extends ConsoleCommand
{
    protected function configure()
    {
        $this->setName('tagmanager:regenerate-released-containers');
        $this->setDescription('Re-generates all released container files');
        $this->addOption('only-with-preview-release', null, InputOption::VALUE_NONE, 'Only regenerate containers with a preview release.');
    }

    /**
     * @return int
     */
    protected function doExecute(): int
    {
        $input = $this->getInput();
        $output = $this->getOutput();
        $onlyPreview = $input->getOption('only-with-preview-release');

        Piwik::postEvent('TagManager.regenerateContainerReleases', [$onlyPreview]);

        $output->writeln('<info>Done</info>');

        return self::SUCCESS;
    }
}
