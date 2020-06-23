<?php

class Residence extends MY_Controller{

    public function __construct(){
        parent::__construct();
    }

    
    
    
    public function index(){
        $this->load_page('index');
    }

    
    public function get_residence(){
        $limit = $this->input->post('length');
		$offset = $this->input->post('start');
		$search = $this->input->post('search');
		$order = $this->input->post('order');
		$draw = $this->input->post('draw');
		$column_order = array('ermita_rid','ermita_rfname');
		$join = array();
		$select = "*";
		$where = array("soft_delete <>" => 0);
		$group = array();
		$list = $this->MY_Model->get_datatables('ermita_residence',$column_order, $select, $where, $join, $limit, $offset ,$search, $order, $group);
		$output = array(
				"draw" => $draw,
				"recordsTotal" => $list['count_all'],
				"recordsFiltered" => $list['count'],
				"data" => $list['data']
		);
		echo json_encode($output);
    }
    
    public function view_profile($residence_id){
        $post = $this->input->post();
        //echo $residence_id;
        $params['where'] = array(
			'ermita_rid' => $residence_id
			
        );

        $data['residence'] = $this->MY_Model->getRows('ermita_residence',$params);
        //$data  = $this->input->post('ermita_rid');
        //$data['residence'] = $this->input->getRows('ermita_residence');
		$this->load_page('residence/residence_profile',$data);
    }


    public function add_residence(){

        $dateUploaded = date('Y-m-d');

        $fname = $this->input->post('fname');
        $mname = $this->input->post('mname');
		$lname = $this->input->post('lname');
		$birthdate = $this->input->post('birthdate');
		$gender = $this->input->post('gender');
		$suffix = $this->input->post('suffix');
		$work = $this->input->post('work');
		$sitio = $this->input->post('sitio');
        $status = $this->input->post('status');
        
        if(!is_dir('./upload/'. $dateUploaded)){
            mkdir('./upload/'. $dateUploaded);

        }

        
        $config['upload_path']          = './upload/'.$dateUploaded;
        $config['allowed_types']        = '*';
        $config['max_size']             = 100000;
        $config['max_width']            = 100000;
        $config['max_height']           = 100000;


        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('imagefile'))
        {
                $error = array('error' => $this->upload->display_errors());

                //$this->load->view('upload_form', $error);
        }
        else{
    
            $data = array(
                'residence_profile_pic' => $this->upload->data('file_name'),
                'ermita_rfname' => $fname,
                'ermita_rmname' => $mname,
                'ermita_rlname' => $lname,
                'ermita_rbirthdate' => $birthdate,
                'ermita_rgender' => $gender,
                'ermita_rsuffix' => $suffix,
                'ermita_rwork' => $work,
                'ermita_rsitio' => $sitio,
                'ermita_rstatus' => $status
            );
            
            $insert = $this->MY_Model->insert('ermita_residence', $data);

            echo json_encode($insert);
        }    
    }

    
    public function delete(){
        $soft_delete = $this->input->post('soft_delete');
        $ermita_rid = $this->input->post('id');
		$where = array( 'ermita_rid' => $ermita_rid );
		$data['soft_delete'] = $soft_delete;
		$update = $this->MY_Model->update('ermita_residence', $data, $where);

        echo json_encode($update);
	}
}
?>