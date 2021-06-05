<?php

namespace app\controllers;

use linslin\yii2\curl;
use yii\base\Model;
use app\models\Jobs;


class JobsController extends \yii\web\Controller
{
    public $enableCsrfValidation = false;
    public function beforeAction($action)
    {

        \Yii::$app->response->format = \yii\web\Response:: FORMAT_JSON;
        return parent::beforeAction($action);
    }
    public function actionSync()
    {
        $request = \Yii::$app->request;
        if (!$request->isPost) {
            \Yii::$app->response->statusCode = 400;
            return [
                'status' => false, 
                'error' => 'Method not allowed in this route'
            ];
        }

        $curl = new curl\Curl();
        $curl->setHeaders(['Content-Type' => 'application/json']);
        $github_jobs = $curl->get('https://jobs.github.com/positions.json');
        $github_jobs = json_decode($github_jobs, true);

        // Delete Jobs which is previously sync into local database
        $deleteJobs = new Jobs();
        $deleteJobs->deleteAll('job_id != :nullValue OR job_id != :empty_value', [
            'nullValue'=>null,
            'empty_value' => '']);
        unset($deleteJobs);

        //Sync into local database 
        $errors = [];
        if ($github_jobs) {
            foreach ($github_jobs as $key => $job) {
                // $Jobs = Jobs::find()->where(['job_id' => $job['id']])->one();
                // if (!$Jobs)
                $Jobs = new Jobs();
                $Jobs->job_id = $job['id'];
                $Jobs->type = $job['type'];
                $Jobs->url = $job['url'];
                $Jobs->created_at = $job['created_at'];
                $Jobs->company = $job['company'];
                $Jobs->company_url = $job['company_url'];
                $Jobs->location = $job['location'];
                $Jobs->title = $job['title'];
                $Jobs->description = $job['description'];
                $Jobs->how_to_apply = $job['how_to_apply'];
                $Jobs->company_logo = $job['company_logo'];
                if ($Jobs->validate() && $Jobs->save()) {
                    $github_jobs[$key]['local_id'] = $Jobs->id;
                } else {
                    $errors[] = $Jobs->getErrors();
                }

            }
        }

        // print_r($response); exit();

        return [
            'status' => true, 
            'error' => $errors, 
            'data'=> $github_jobs
        ];

    }

}
