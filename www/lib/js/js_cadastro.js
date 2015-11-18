// JavaScript Document

//Var's
var ip = '192.168.0.146:8888';//'10.0.0.6:8888';
var campos,values;
var arrDadosCampos = new Array();
var arrDadosValues = new Array();
var arrDadosValues2 = new Array();
var arrEmails = new Array();


//Array

 
//var ExternalURLMVC = 'http://192.168.0.14/base_mvc4/';
var ExternalURLMVC = 'http://maxexpe-001-site6.smarterasp.net/';
 
$(window).load(function()
{   
    $('#viewLogin').append('<div class="formFieldWrap">'+
                                                '<label class="field-title contactEmailField" for="participantesEmail">ENTRE COM E-MAIL</label>'+
                                                '<input type="email" name="repEmail" value="" class="contactField" id="repEmail" placeholder="E-MAIL"/>'+
                                              '</div>'+
                                              
                                            '<div class="formSubmitButtonErrorsWrap">'+
                                                '<input type="button" class="buttonWrap button button-blue contactSubmitButton" id="btSendMail2" value="ENTRAR"/>'+
                                            '</div><br><br>');
     $('#btSendMail2').click(function(){
                            
                            
                //var form = $('#form-login'); 
                //var param = form.serialize();
                var repEmail = $('#repEmail').val();
                var param =  {"login":repEmail,"senha":""};

                $.ajax({
                    async: true,
                    data : param,
                    type: 'post',
                    cache: false,
                    url: ExternalURLMVC + 'IntegracaoSite/Login',
                    success: function(data) {
                        if(data.Sucesso){
                           console.log("id treinador " + data.Sucesso);
                          window.localStorage.setItem("idActualUserTreinador", data.IdTreinador);
                          window.location='cadastro.html';
                        }else{
                             
                             alert(data.MensagemErro)
                        }
                    },
                    error: function (xhr, err) {
                        console.log(xhr);
                        //form.append('<p class="error-message">Erro ao logar, por favor tente novamente mais tarde.</p>');
                       alert('Erro ao logar, por favor tente novamente mais tarde = erro ' + err);
                    }
                });

                return false;
             
            }); 

    ///SEND FORM
    $('#send-form').click(function(e){

        var email = $('#participantesEmail').val();

         if(email== ''){
                alert('Por favor preencher o campo email.');
               return false;
            }
            if(IsEmail(email)==false){
                 alert('Por favor preencher o campo email corretamente.');
                return false;
            }

           function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
           return false;
        }else{
           return true;
        }
      } 

        if($('#participantesNome').val() !== '')
                    {
                        db.transaction(handleInsertParticipantesSuccess, handleInsertParticipantesError);
                    
                        function  handleInsertParticipantesSuccess(tx, result)
                        {
                

                             arrDadosCampos = [];
                             arrDadosValues = [];
                             arrDadosValues2 = [];
                             campos = '';
                             values = '';

                             var postData = $('#form-cadastro').serializeArray();


                             $.each(postData, function(i, index)
                             { 
                                arrDadosCampos.push(index.name);
                                arrDadosValues.push('"'+html_entity_decode(index.value)+'"');
                                arrDadosValues2.push(implode(", ", index.value));

                             });

                            sendDataParticipanteServer(arrDadosValues2);

                             campos = implode(", ", arrDadosCampos);
                             values = implode(", ", arrDadosValues);
                            
                             //console.log(arrDadosValues2[0]);
 
                             antsDb.handleInsert({tabela:'tb_participantes', txDb:tx, field:campos, value:values});

 
                             alert('Dados cadastrados com sucesso. INICIAR GAME!!');
                             $('#participantesNome').val('');
                             $('#participantesEmail').val('');
                             $('#participantesTelefone').val('');
                             $('#participantesCrm').val('');
                            
                             //window.location.reload();
                        
                              window.location='indexContainerGame.html';
                             //db.transaction(handleGetDataParticipantesSuccess, handleGetDataParticipantesError);
                           
                                 tx.executeSql('select * from tb_participantes ORDER BY participantesId DESC LIMIT 1', [], 
                                function (tx, result)
                                {
                                    
                                  
                                        var dados = result.rows.item(0);
                                        var idActualUser = dados.participantesId;
                                        var nomeActualUser = dados.participantesNome;
                                        window.localStorage.setItem("idActualUser", idActualUser);
                                        window.localStorage.setItem("nomeActualUser", nomeActualUser);
                                },
                                function()
                                {
                                     
                                });

 

                        }
                   
                        function  handleInsertParticipantesError(tx, result)
                        {
                            alert('Houve um erro ao cadastrar o participante. SQLlite error');
                            console.log(tx);
                        }
                    }
                    else
                    {
                        alert('Por favor preencher o campo nome');
                        $('#participantesNome').focus();
                    }
    });
    
    $('#viewParticipantes').click(function(e)
    {
        $('#tblParticipantes').empty();
        $('#viewEmail').empty();
      //  $('#viewLogin').empty();
        $('#tblParticipantes').hide();
        $('#viewEmail').show();
        
 

        db.transaction(function(tx)
        {
            
            tx.executeSql('select participantesNome, participantesId from tb_participantes', [], 
            function (tx, result)
            {
                var len = result.rows.length;
               
                if(len < 1){
                    $('#tblParticipantes').append('<tr> <th colspan="3">Nenhum participante cadastrado</th> </tr>');
                 }
                
                else
                 {
                   
                     $('#tblParticipantes').append('<tr> <th colspan="3">Participantes cadastrados</th> </tr>');
                     $('#tblParticipantes').show();
                             $('#viewEmail').hide();
                              alert("Total participantes = " +  len); 
                         

                     
                    ///SEND TO MAIL
                    $('#btSendMail').click(function(){
                       $('#viewEmail').empty();
                        
                                    
                   
                          /*  db.transaction(function(tx)
                             {
                                 
                                arrEmails = [];
                                 
                                tx.executeSql('select * from tb_participantes', [], 
                                function (tx, result)
                                {
                                    
                                    
                                    for(var i=0; i< len; i++)
                                    {
                                        var dados = result.rows.item(i);
                                        
                                        arrEmails.push(Array(
                                                     {
                                                         id:dados.participantesId, 
                                                         nome:dados.participantesNome, 
                                                         email:dados.participantesEmail,
                                                         telefone:dados.participantesTelefone,
                                                         crm:dados.participantesCrm,
                                                         cidade:dados.participantesCidade,
                                                         observacao:dados.participantesObservacao
                                                     }));
                                                   
                                        
                                    }
                                    
                                    if(i=== len)
                                    {
                                        handleSendDataToMail(arrEmails)
                                    }
                                        
                                    
                                },
                                function()
                                {
                                    
                                });
                             });*/
                            
                                
                             
                        
                    });
    
    
                     for(var i=0; i< len; i++)
                     {
                         var dados = result.rows.item(i);
                         
                         $('#tblParticipantes').append('<tr id="tr_'+dados.participantesId+'">'+
                                        '<td colspan="2" class="table-sub-title">'+dados.participantesNome+'</td>'+
                                       // '<td style="width: 20px" >'+
                                          //  '<ul class="icon-list">'+
                                               // '<li class="delete-list" id="'+dados.participantesId+'">delete</li>'+
                                        //   + '</ul>'+
                                     //   '</td>'+
                                      '</tr>');
                              
                              
                         $('#'+dados.participantesId).click(function()
                         {
                                var id = $(this).attr('id')
                           
                                if(confirm('Tem certeza que deseja remover este usuário?'))
                                {
                                    db.transaction(function(tx)
                                     {

                                         tx.executeSql('DELETE from tb_participantes WHERE participantesId='+id, [], 
                                         function (tx, result)
                                         {
                                             $('#tr_'+id).remove();
                                             len--;
                                             
                                             if(len === 0)
                                             {
                                                 $('#tblParticipantes').empty();
                                                 $('#viewEmail').empty();
                                                 $('#tblParticipantes').append('<tr> <th colspan="3">Nenhum participante cadastrado</th> </tr>');
                                                 
                                             }
                                         },
                                         function(){
                                             alert('Houve um erro, tente novamente!')
                                         });
                                     });
                                }
                            
                            
                         });
                     }
                     
                 }
            },
            function()
            {
                alert('Houve um erro, por favor feche abra o aplicativo novamente!')
            });
                            
        });
    })
    
    
    
    function handleSendDataToMail(arrDados)
    {
        
       var emailRep = $('#repEmail').val();
        $.post(ExternalURL+'Send_Mail_Controll.php',{dados:arrDados, email:emailRep},
        function(data)
        {
           
            if(data.mensagem === 'success')
            {
                alert('Dados enviados com sucesso!');
            }
            else
            {
                alert('Houve um erro ao enviar os dados.')
            }

        },'json');
    }


    function sendDataParticipanteServer(arrDados){
            
            _idTreinador = parseInt(window.localStorage.getItem("idActualUserTreinador"));
            var param =  {"nome":arrDados[0],"cpf":arrDados[1],"email":arrDados[2],"fone":arrDados[3],"idTreinador":_idTreinador};

           $.ajax({
                    async: true,
                    data : param,
                    type: 'post',
                    cache: false,
                    url: ExternalURLMVC + 'IntegracaoSite/SalvaParticipante2',
                    success: function(data) {
                        if(data.Sucesso){
                           console.log("Sucesso SalvaParticipante2 " + data.Sucesso);
                         
                        }else{
                             
                             alert(data.MensagemErro)
                        }
                    },
                    error: function (xhr, err) {
                        console.log(xhr);
                        //form.append('<p class="error-message">Erro ao logar, por favor tente novamente mais tarde.</p>');
                       alert('Erro ao SalvarParticipante2, por favor tente novamente mais tarde = erro ' + xhr);
                    }
                });


    }
        
        
});

