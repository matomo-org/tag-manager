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
use Symfony\Component\Console\Input\InputInterface;

use Symfony\Component\Console\Output\OutputInterface;

class RegenerateContainers extends ConsoleCommand
{
    protected function configure()
    {
        $this->setName('tagmanager:regenerate-released-containers');
        $this->setDescription('Re-generates all released container files');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        Piwik::postEvent('TagManager.regenerateContainerReleases');

        $output->writeln('<info>Done</info>');
    }
}
