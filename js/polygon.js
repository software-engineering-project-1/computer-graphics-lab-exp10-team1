var number_of_verticies=0;
window.onload = function(){
  renderChart(25,25);
}
function sortNumber(a,b){
  return a-b;
}
function getValues(id){
  var element = document.getElementById(id);
  if(!element.value || parseInt(element.value) >= parseInt(element.placeholder)||element.value <0){
    return element.placeholder;
  }
  return element.value;
}

function addNewTextBox(id,name){
  var td = document.createElement('TD');
  td
  var label_box= document.createElement('LABEL');
  var text_msg=document.createTextNode(name.toUpperCase()+id+' : ');
  label_box.appendChild(text_msg);
 
  var textbox = document.createElement('INPUT');  
  textbox.setAttribute('type','TEXT');
  textbox.setAttribute('id','txt_'+name+id);
  textbox.setAttribute('size','2');
  label_box.appendChild(textbox);
  td.appendChild(label_box);
  return td;
}

function addNewCommandButton(id,text){
  var cmd_button = document.createElement('INPUT');
  cmd_button.setAttribute('type','button');
  cmd_button.setAttribute('id',id);
  cmd_button.setAttribute('value',text);
  return cmd_button;
}

function startExperiment(){
  renderChart(getValues("txtFrameWidth"),getValues("txtFrameHeight"));
  var elements = document.getElementById("frameForm").children;
  for (var _each=0;_each < elements.length;_each++){
    elements[_each].style.visibility="hidden";
  }
  getVerticesCount();
}

function getVerticesCount() {
  var label_box= document.createElement('LABEL');
  var text_msg=document.createTextNode('No.of Verticies:(max -10)');
  label_box.appendChild(text_msg);
  
  var textbox = document.createElement('INPUT');  
  textbox.setAttribute('type','TEXT');
  textbox.setAttribute('id','txtNOV');
  textbox.setAttribute('placeholder','10');
  
  var command_button=document.createElement('INPUT');
  command_button.setAttribute('type','button');
  command_button.setAttribute('id','cmdSetNOV');
  command_button.setAttribute('value','Enter');
  command_button.onclick=function() { appendVertices() };
  
  document.getElementById("frameForm").appendChild(label_box);
  document.getElementById("frameForm").appendChild(document.createElement("br"));
  document.getElementById("frameForm").appendChild(textbox);
  document.getElementById("frameForm").appendChild(document.createElement("br"));
  document.getElementById("frameForm").appendChild(document.createElement("br"));
  document.getElementById("frameForm").appendChild(command_button);
}

function appendVertices(){ 
  window.number_of_verticies = getValues("txtNOV");
  
  var elements = document.getElementById("frameForm");
  while (elements.firstChild){
    elements.removeChild(elements.firstChild);
  }
  var table = document.createElement('TABLE');
  table.setAttribute('border','0');
  table.appendChild(document.createElement('TBODY'));
  for (var _text_pair=0;_text_pair<parseInt(window.number_of_verticies);_text_pair++) {
    tr = document.createElement('TR');
    tr.appendChild(addNewTextBox(_text_pair,'x'));
    tr.appendChild(addNewTextBox(_text_pair,'y'));
    table.appendChild(tr);
  }
  var tr_cmds = document.createElement('TR');
  tr_cmds.setAttribute('align','justify');
  var next_iteration=addNewCommandButton('cmdNextIter','Next');
  var prev_iteration=addNewCommandButton('cmdPrevIter','Prev');
  var reset_lab=addNewCommandButton('cmdReset','Reset');
  next_iteration.onclick=function() { plotArea() };
  reset_lab.onclick=function(){location.reload();}
  tr_cmds.appendChild(document.createElement('TD').appendChild(next_iteration));
  tr_cmds.appendChild(document.createElement('TD').appendChild(prev_iteration));
  tr_cmds.appendChild(document.createElement('TD').appendChild(reset_lab));
  table.appendChild(tr_cmds);
  document.getElementById("frameForm").appendChild(table);
}
function plotArea(){
  var xVerts=[];
  var yVerts=[];
  var dps=[];
//TODO:Improve this logic
  for (var i=0;i < window.number_of_verticies;i++){
   _x= parseInt(getValues("txt_x"+i));
   _y=parseInt(getValues("txt_y"+i));
   dps.push({x:_x,y:_y});
 }
  console.log(dps);
  var elements = document.getElementById("frameCanvas");
  while (elements.firstChild){
    elements.removeChild(elements.firstChild);
  }
  var cj_element = document.createElement('div');
  cj_element.setAttribute('id','chartContainer');
  cj_element.style.height="431";
  cj_element.style.width="862";
  document.getElementById("frameCanvas").appendChild(cj_element);
  var chart = new CanvasJS.Chart("chartContainer",{
    title:{
      text:"Rasterization-Polygon"
    },
    data:[{
      type:"splineArea",
      dataPoints: dps
    }]
  });
  chart.render();
 console.log(xVerts);
 console.log(yVerts);
}

function renderChart(max_width,max_height){
  var scaleX =[];
  var scaleY=[];
  for (var i=0;i <= max_width;i++) { 
    scaleX.push(i);
  }
  for (var i=0;i<= max_height;i++) {
    scaleY.push(i);
  }
  var lineChartData = {
    labels : scaleX,
    datasets : [
      {
        fillColor : "rgba(220,220,220,0)",
        strokeColor : "rgba(220,220,220,0)",
        pointColor : "rgba(220,220,220,0)",
        pointStrokeColor : "rgba(220,220,220,0)",
        pointHighlightFill : "rgba(220,220,220,0)",
        pointHighlightStroke : "rgba(220,220,220,0)",
        scaleSteps: 1,
        scaleStartValue: 0,
        scaleStepWidth:1,
        data : scaleY
      }
    ]
  };
  
  var ctx = document.getElementById("polyCanvas").getContext("2d");
  window.myLineChart = new Chart(ctx).Line(lineChartData, {
    responsive: true,
    animation: false,
    datasetStroke: false,
    scaleOverride: false,
    scaleGridLineWidth:1,
    showTooltips: false
  });
}

