<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller{

    public function index(){
        $params = array(
			'where' => array(
				'fk_user_id' => $this->session->userdata('user_id'),
			)
        
        );
        $this->load_page('index');
    }
        
}













?>