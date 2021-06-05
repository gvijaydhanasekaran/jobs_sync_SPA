<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%jobs}}`.
 */
class m210605_012230_create_jobs_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%jobs}}', [
            'id' => $this->primaryKey(),
            'job_id' => $this->string(255),
            'type' => $this->string(10)->defaultValue('Full Time'),
            'url' => $this->string(),
            'created_at' => $this->string(255),
            'company' => $this->string(100),
            'company_url' => $this->string(255),
            'location' => $this->string(255),
            'title' => $this->string(255)->notNull(),
            'description' => $this->text(),
            'how_to_apply' => $this->text(),
            'company_logo' => $this->string(2048),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%jobs}}');
    }
}
