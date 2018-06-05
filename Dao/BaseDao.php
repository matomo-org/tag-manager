<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Dao;

use Piwik\Common;
use Piwik\Date;
use Piwik\Db;

abstract class BaseDao
{
    const STATUS_ACTIVE = 'active';
    const STATUS_DELETED = 'deleted';

    protected $table = '';
    protected $tablePrefixed = '';

    public function __construct()
    {
        $this->tablePrefixed = Common::prefixTable($this->table);
    }

    public function uninstall()
    {
        Db::query(sprintf('DROP TABLE IF EXISTS `%s`', $this->tablePrefixed));
    }

    protected function insertRecord($values)
    {
        $columns = implode('`,`', array_keys($values));
        $fields = Common::getSqlStringFieldsArray($values);

        $sql = sprintf('INSERT INTO %s (`%s`) VALUES(%s)', $this->tablePrefixed, $columns, $fields);
        $bind = array_values($values);

        Db::query($sql, $bind);

        $id = Db::get()->lastInsertId();

        return (int) $id;
    }

    public function updateEntity($columns, $whereColumns)
    {
        if (!empty($columns)) {
            $fields = array();
            $bind = array();
            foreach ($columns as $key => $value) {
                $fields[] = ' ' . $key . ' = ?';
                $bind[] = $value;
            }
            $fields = implode(',', $fields);
            $where = [];
            foreach ($whereColumns as $col => $val) {
                $where[] = '`' . $col .'` = ?';
                $bind[] = $val;
            }
            $where = implode(' AND ', $where);

            $query = sprintf('UPDATE %s SET %s WHERE %s', $this->tablePrefixed, $fields, $where);

            // we do not use $db->update() here as this method is as well used in Tracker mode and the tracker DB does not
            // support "->update()". Therefore we use the query method where we know it works with tracker and regular DB

            Db::query($query, $bind);
        }
    }

    protected function getCurrentDateTime()
    {
        return Date::now()->getDatetime();
    }
}

