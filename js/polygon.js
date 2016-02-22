/**
 * Global Variables set for Graph
 */
var number_of_verticies = 0;
var max_height = 25;
var max_width = 25;
var dps=[];
var dps1=[];
var dps2=[];
window.onload = function(){
  renderChart(max_height,max_width);
}
/**
 * Reusable Methods
 */
function getValues(id){
  var element = document.getElementById(id);
  if(!element.value || parseInt(element.value) >= parseInt(element.placeholder)||element.value <0){
    return element.placeholder;
  }
  return element.value;
}

function addNewTextBox(id,name){
  var td = document.createElement('TD');
  var label_box= document.createElement('LABEL');
  var text_msg=document.createTextNode(name.toUpperCase()+id+' : ');
  label_box.appendChild(text_msg);
  label_box.setAttribute('class','control-label');
  var textbox = document.createElement('INPUT');  
  textbox.setAttribute('type','number');
  textbox.setAttribute('id','txt_'+name+id);
  textbox.setAttribute('required','true');
  textbox.setAttribute('pattern',"[-0-9]+");
  textbox.setAttribute('class','form-control-inline');
  textbox.setAttribute('min','0');
  if(name =='x') {
    textbox.setAttribute('max',window.max_width);      
  }
  else {
    textbox.setAttribute('max',window.max_height);
  }
  label_box.appendChild(textbox);
  td.appendChild(label_box);
  return td;
}

function addNewCommandButton(id,text){
  var cmd_button = document.createElement('INPUT');
  cmd_button.setAttribute('type','button');
  cmd_button.setAttribute('id',id);
  cmd_button.setAttribute('class','btn btn-primary');
  cmd_button.setAttribute('value',text);
  return cmd_button;
}
function flushChildElements(element) {
  var elements = document.getElementById(element);
  while (elements.firstChild){
    elements.removeChild(elements.firstChild);
  }
}
function isNumber(event){
  var keyEntry = event.charCode?event.charCode:event.keyCode;
  if (keyEntry !=8) {
    if (keyEntry == 13 || keyEntry ==9 ){
      return true;
    }
    if (keyEntry<48 || keyEntry>57)
      return false;
  }
}
/**
 * 
 */
function startExperiment(){
  renderChart(getValues("txtFrameWidth"),getValues("txtFrameHeight"));
  flushChildElements("divForm");
  getVerticesCount();
}

function getVerticesCount() {
  var label_box= document.createElement('LABEL');
  var text_msg=document.createTextNode('No.of Verticies:(max -10)');
  label_box.appendChild(text_msg);
  label_box.setAttribute('class','control-label');
  
  var textbox = document.createElement('INPUT');  
  textbox.setAttribute('type','TEXT');
  textbox.setAttribute('id','txtNOV');
  textbox.setAttribute('placeholder','10');
  textbox.setAttribute('class','form-control');
  textbox.onkeypress = function (event) { return isNumber(event) }; 
  var command_button=document.createElement('INPUT');
  command_button.setAttribute('type','button');
  command_button.setAttribute('id','cmdSetNOV');
  command_button.setAttribute('value','Start');

  command_button.setAttribute('class','btn btn-primary btn-block');
  
  var reset_button=document.createElement('INPUT');
  reset_button.setAttribute('type','button');
  reset_button.setAttribute('id','cmdSetNOV');
  reset_button.setAttribute('value','Restart Experiment');
  reset_button.setAttribute('class','btn btn-default btn-block');
  
  document.getElementById("divForm").appendChild(label_box);
  document.getElementById("divForm").appendChild(document.createElement("br"));
  document.getElementById("divForm").appendChild(textbox);
  document.getElementById("divForm").appendChild(document.createElement("br"));
  document.getElementById("divForm").appendChild(document.createElement("br"));
  document.getElementById("divForm").appendChild(command_button);
  document.getElementById("divForm").appendChild(document.createElement("br"));
  document.getElementById("divForm").appendChild(document.createElement("br"));
  document.getElementById("divForm").appendChild(reset_button);
  
  command_button.onclick= function() { getVerticies() };
  reset_button.onclick = function()  { location.reload();}
}

function getVerticies(){ 
  window.number_of_verticies = getValues("txtNOV");
  flushChildElements("divForm");
  
  var table = document.createElement('TABLE');
  table.setAttribute('border','0.5');
  table.appendChild(document.createElement('TBODY'));
  for (var _text_pair=0;_text_pair<parseInt(window.number_of_verticies);_text_pair++) {
    tr = document.createElement('TR');
    tr.appendChild(addNewTextBox(_text_pair,'x'));
    tr.appendChild(addNewTextBox(_text_pair,'y'));
    table.appendChild(tr);
  }
  tr = document.createElement('TR');
  td1 = document.createElement('TD');
  td2 = document.createElement('TD');
  var start=addNewCommandButton('cmdStart','Start');
  var reset=addNewCommandButton('cmdReset','Reset');
  var next=addNewCommandButton('cmdNext','Next');
  var prev=addNewCommandButton('cmdPrev','Prev');
  start.setAttribute('class','btn btn-primary btn-block');  
  next.setAttribute('class','btn btn-primary btn-block disabled');
  prev.setAttribute('class','btn btn-primary btn-block disabled');
  reset.setAttribute('class','btn btn-primary btn-block');
  td1.appendChild(next);
  td1.appendChild(start);
  tr.appendChild(td1);
  td2.appendChild(prev);
  td2.appendChild(reset);
  tr.appendChild(td2);
  table.appendChild(tr);
  document.getElementById("divForm").appendChild(table);
  reset.onclick=function(){location.reload();}
  start.onclick = function(){
    start.setAttribute('class','btn btn-primary btn-block disabled');
    next.setAttribute('class','btn btn-primary btn-block');
    getEdgeTable();
  }
  next.onclick = function(){
    start.setAttribute('class','btn btn-primary btn-block disabled');
    prev.setAttribute('class','btn btn-primary btn-block');
    var val = $('#divCanvas').data('stripline') ? $('#divCanvas').data('stripline') : 0;
    $('#divCanvas').data('stripline',val+1);
    plotEdgeActiveTable();
    renderChart(max_width,max_height);
    if (val >=window.max_height) {
      next.setAttribute('class','btn btn-primary btn-block disabled');
    }
  }
  prev.onclick=function(){
    start.setAttribute('class','btn btn-primary btn-block disabled');
    next.setAttribute('class','btn btn-primary btn-block');
    var val = $('#divCanvas').data('stripline') ? $('#divCanvas').data('stripline') : 0;
    $('#divCanvas').data('stripline',val-1);
    plotEdgeActiveTable();
    renderChart(max_width,max_height);
    if (val <=0){
      prev.setAttribute('class','btn btn-primary btn-block disabled');
    }
  }
}
function getEdgeTable(){
  var y_upper = 0;
  for (var i=0;i < window.number_of_verticies;i++){
   _x= parseInt(getValues("txt_x"+i));
   _y=parseInt(getValues("txt_y"+i));
   y_upper = y_upper > _y ? y_upper :_y;
   window.dps.push({x:_x,y:_y});
   window.dps1.push({x:_x,y:_y});
 }
  window.dps.push(window.dps[0]);
  renderChart(max_height,max_width);
}
function plotEdgeActiveTable(){
  var y_current =$('#divCanvas').data('stripline');
  window.dps1.sort(function(a, b){
    return a.y-b.y
   });
//TODO:Improve Logic
  for (var i=0;i<window.dps1.length;i++) {
    _current_x = window.dps1[i].x;
    _current_y = window.dps1[i].y;
    if(y_current === _current_y) {
      window.dps2.pop();
      window.dps2.push({x:_current_x,y:_current_y});
      window.dps2.push(window.dps2[0]);
    }
  }
}
function renderChart(max_width,max_height){
  window.max_width  = max_width >= window.max_width ? window.max_width : max_width;
  window.max_height = max_height >= window.max_height ? window.max_height: max_height;
  
  var scaleX =[];
  var scaleY=[];
  var stripline_value= $('#divCanvas').data('stripline') ? $('#divCanvas').data('stripline') : 0;
  for (var i=0;i <= window.max_width;i++) { 
    scaleX.push(i);
  }
  for (var i=0;i <= window.max_height;i++) {
    scaleY.push(i);
  }
  var chart_element = document.createElement('div');
  chart_element.setAttribute('id','chartContainer');
  document.getElementById("divCanvas").appendChild(chart_element);
  var chart = new CanvasJS.Chart("chartContainer",{
    zoomEnabled: true,
    zoomType: "xy",
    title: {
     text: "Rasterization - Polygon",
     fontSize: 30
    },
    axisY:{
      minimum : 0,
      interval: 1,
      labelFontSize: 10,
      maximum: window.max_height,
      gridThickness: 0.75,
      stripLines: [
       {
         startValue: 0,
         endValue: stripline_value,
         opacity: .3
       }
      ]
    },
    axisX:{
      minimum: 0,
      interval: 1,
      labelFontSize: 10,
      maximum: window.max_width,
      gridThickness: 0.75,
    },
    toolTip:{
      enabled: true
    },
    data: [ {
      type: "line",
      visible: false,
      dataPoints: [ {x:window.max_width,y:window.max_height}],
    },
    {
      type: "spline",
      visible: true,
      dataPoints: window.dps
    },
    {
      type: "splineArea",
      visible: true,
      dataPoints: window.dps2
    }
    ]
  })
  chart.render();
 
}
