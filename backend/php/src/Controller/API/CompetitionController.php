<?php
class CompetitionController extends BaseController
{
    public function competionAction()
    {   
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'POST'){
            try 
            {
                $projectModel = new ModelProject();
                $picModel = new ModelProjectBild();
                $userModel = new ModelTeilnehmende();
                $textModel = new ModelText();


            } 
            catch (Error $e) 
            {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }         
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        if(!$strErrorDesc)
        {
            $this->sendOutput($responseData,array('Content-Type: application/json', 'HTTP/1.1 200 Blackrose'));
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
            array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }
}