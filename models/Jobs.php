<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "jobs".
 *
 * @property int $id
 * @property string|null $job_id
 * @property string|null $type
 * @property string|null $url
 * @property string|null $created_at
 * @property string|null $company
 * @property string|null $company_url
 * @property string|null $location
 * @property string $title
 * @property string|null $description
 * @property string|null $how_to_apply
 * @property string|null $company_logo
 */
class Jobs extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'jobs';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title'], 'required'],
            [['description', 'how_to_apply'], 'string'],
            [['job_id', 'created_at'], 'string', 'max' => 255],
            [['type'], 'string', 'max' => 10],
            [['company_logo'], 'string', 'max' => 2048],
            [['url', 'company_url', 'location', 'title'], 'string', 'max' => 255],
            [['company'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'job_id' => 'Job ID',
            'type' => 'Type',
            'url' => 'Url',
            'created_at' => 'Created At',
            'company' => 'Company',
            'company_url' => 'Company Url',
            'location' => 'Location',
            'title' => 'Title',
            'description' => 'Description',
            'how_to_apply' => 'How To Apply',
            'company_logo' => 'Company Logo',
        ];
    }
}
