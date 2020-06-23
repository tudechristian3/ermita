<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Paper extends MY_Controller{

    // public function index(){
    //     $this->load_page('index');
    // }

    public function get_certificate(){
        $limit = $this->input->post('length');
		$offset = $this->input->post('start');
		$search = $this->input->post('search');
		$order = $this->input->post('order');
		$draw = $this->input->post('draw');
		$column_order = array('ermita_certificate_id','ermita_certificate_status');
		$join = array();
		$select = "*";
		$where = array("soft_deletion <>" => 0);
		$group = array();
		$list = $this->MY_Model->get_datatables('certificate',$column_order, $select, $where, $join, $limit, $offset ,$search, $order, $group);
		$output = array(
				"draw" => $draw,
				"recordsTotal" => $list['count_all'],
				"recordsFiltered" => $list['count'],
				"data" => $list['data']
		);
		echo json_encode($output);
    }
        
}













?>