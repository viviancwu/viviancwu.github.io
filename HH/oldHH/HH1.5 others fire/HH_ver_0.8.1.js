//const { pi, json } = require("mathjs");

//const { e } = require("mathjs");

//const math = require("mathjs");
var config = {responsive: true}; 

var layout = {
  title: '<b>Voltage Time Series</b>',
  xaxis: {
    title: '<b>Time (ms)</b>'
  },
  yaxis: {
    title: '<b>Membrane Potential (mV)</b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: true,
}; 

var layout2 = {
  title: '<b>V vs. m</b>',
  xaxis: {
    title: '<b>Voltage (mV)</b>'
  },
  yaxis: {
    title: '<b>m</b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: false,
}; 

var layout3 = {
  title: '<b>V vs. n</b>',
  xaxis: {
    title: '<b>Voltage (mV)</b>'
  },
  yaxis: {
    title: '<b>n</b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: false,
}; 

var layout4 = {
  title: '<b>V vs. h</b>',
  xaxis: {
    title: '<b>Voltage (mV)</b>'
  },
  yaxis: {
    title: '<b>h</b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: false,
}; 

var layout5 = {
  title: '<b>I<sub>Na</sub> vs. Time</b>',
  xaxis: {
    title: '<b>Time (ms)</b>'
  },
  yaxis: {
    title: '<b>I<sub>Na</sub> (nA)</b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: false,
}; 

var layout6 = {
  title: '<b>I<sub>K</sub> vs. Time</b>',
  xaxis: {
    title: '<b>Time (ms)</b>'
  },
  yaxis: {
    title: '<b>I<sub>K</sub> (nA)</b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: false,
}; 

var layout7 = {
  title: '<b>I<sub>leak</sub> vs. Time</b>',
  xaxis: {
    title: '<b>Time (ms)</b>'
  },
  yaxis: {
    title: '<b>I<sub>leak</sub> (nA)</b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: false,
}; 

var layout8 = {
  title: '<b>I vs. Time</b>',
  xaxis: {
    title: '<b>Time (ms)</b>'
  },
  yaxis: {
    title: '<b>I</b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: true,
}; 

var layout9 = {
  title: '<b>Gating variables</b>',
  xaxis: {
    title: '<b>Time (ms)</b>'
  },
  yaxis: {
    title: '<b><i>x(t)</i></b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: true,
}; 

var layout10 = {
  title: '<b>Total I vs. Time</b>',
  xaxis: {
    title: '<b>Time (ms)</b>'
  },
  yaxis: {
    title: '<b>I<sub>t</sub></b>'
  }, 
  autosize: true, 
  paper_bgcolor: '#c7c7c7',
  showlegend: true,
}; 

var dt = 0.01;               // time step for forward euler method
var offset = 3/dt; 
var vcoffset = 25/dt; 
var Cm = 0.01; 

var gNa = 1.2;
  
var eNa=55.17;
var gK = 0.36;  
var eK=-72.14;
var gL=0.003;  
var eL=-49.42; 

var tspan = 25; 
var I = 0.1; 
var curd = 1; 
var v = -60; 
var time = 10;
var I2 = 0;
var curd2 = 0;
var v2 = -60;
var mi = alphaM(v)/(alphaM(v)+betaM(v)); 
var m2 = alphaM(v2)/(alphaM(v2)+betaM(v2)); 
var hi = alphaH(v)/(alphaH(v)+betaH(v)); 
var h2 = alphaH(v2)/(alphaH(v2)+betaH(v2)); 
var ni = alphaN(v)/(alphaN(v)+betaN(v)); 
var n2 = alphaN(v2)/(alphaN(v2)+betaN(v2)); 

var VC = 0; 
var clampv = 0; 
var clampv2 = 0;
var clamptime=0;
var clamptime2=0;
var restv = -60;

//dendrite set up

var nSegments=1;
var g_coupl=20000; //ns
var synLoc=0;
var d_soma=20; //um
var d_dend=1; //um 
var l_dend=400; //um
var R_input = 100;
var tauM = 10;
//var C_M = tauM*0.001/(R_input*1*1e6)*1*1e12;
var C_M = 0.01;
var A_soma = 4*Math.PI*(d_soma/2)^2;
var A_seg = 2*Math.PI*(d_dend/2)*l_seg;
var R_seg = d_dend*l_dend/(2*d_soma*nSegments)*R_input;
var tauM_seg = R_seg*1e6*C_M*1e-12*1e3;
var l_seg = l_dend/nSegments;
var vDend = [];

//set up soma
var E_leak = -70;

var	AP_threshold = -40;
var	AP_max = 20
var	AP_reset = -50

var wDur=250;
var deltaT = 0.00001;
var	ite = wDur*1e-3/deltaT;
var synRecov=1;
var synFRecov=1;
var y1=0;
var y2=0;

var t = []; 
var V = []; 
var m = []; 
var h = []; 
var n = []; 
var ina = []; 
var ik = []; 
var il = []; 
var fik = []; 
var fina = []; 
var curinjt = []; 
var curinj = []; 
var curinj2=[]
var curinjt2=[];
var itt = []; 

var oldV = []; 
var oldina = []; 
var oldik = []; 
var olditt = []; 
var VQ = []; 
var inaQ = []; 
var ikQ = []; 
var ittQ = []; 
var vMembrane = [];
vMembrane.push(restv);
for(var i=0; i<10; i++){
	var p = (i+1).toString();
	eval('var vMembrane_'+p+'=[];');
	eval('var vMem = vMembrane_'+p+';');
	vMem.push(vMembrane[0]);
	vDend.push(vMem);
}







var userlast10Flag = document.getElementById("last10Trace"); 
var userlastFlag = document.getElementById("lastTrace");
var userVCFlag = document.getElementById("VC"); 
var userVC2Flag = document.getElementById("VC2");
var VC2 = userVC2Flag;
var userTTX = document.getElementById("ttx"); 
var userTEA = document.getElementById("tea"); 
var userDendrite = document.getElementById("dendrite");

var userVCpanel = document.getElementById("VCPanel"); 
var userVC2panel = document.getElementById("VC2Panel");
var userclampV = document.getElementById("clampV"); 
var userclamptime = document.getElementById("clampVtime");
var userrestV = document.getElementById("restV"); 

var userParapanel = document.getElementById("ParaPanel"); 
var usercustomFlag = document.getElementById("custompara"); 
var usermi = document.getElementById("mi"); 
var usermRange = document.getElementById("mRange"); 
var userhi = document.getElementById("hi"); 
var userhRange = document.getElementById("hRange"); 
var userni = document.getElementById("ni"); 
var usernRange = document.getElementById("nRange"); 

var userHHpanel1 = document.getElementById("pbottom");
var userHHpanel2 = document.getElementById("pbottom2");
var usertspan = document.getElementById("tspan"); 
var useriinput = document.getElementById("iinput"); 
var usercurd = document.getElementById("duration"); 
var userrv = document.getElementById("rv");
var useriinput2 = document.getElementById("iinput2"); 
var usercurd2 = document.getElementById("duration2"); 
var userrv2 = document.getElementById("rv2");
var userdurationHH = document.getElementById("durationHH");

var userDpanel = document.getElementById("DPanel");
var userseg = document.getElementById("seg");
var useriinputd = document.getElementById("iinputd");
var usergcoup = document.getElementById("gcoup");
var usercurrentinj = document.getElementById("currentinj");
var userd_soma = document.getElementById("d_soma");
var userd_dend = document.getElementById("d_dend");
var userl_dend = document.getElementById("l_dend");


document.getElementById("reset").addEventListener("click", resetPanel); 
document.getElementById("last10Trace").addEventListener("change", checkMode10); 
document.getElementById("lastTrace").addEventListener("change", checkMode); 
document.getElementById("VC").addEventListener("change", VCcheck); 
document.getElementById("VC2").addEventListener("change", VCcheck);
document.getElementById("dendrite").addEventListener("change", submit);
document.getElementById("ttx").addEventListener("change", blocker); 
document.getElementById("tea").addEventListener("change", blocker); 

document.getElementById("clampV").addEventListener("change", VCsubmit); 
document.getElementById("clampVtime").addEventListener("change", VCsubmit); 
document.getElementById("restV").addEventListener("change", VCsubmit); 

document.getElementById("custompara").addEventListener("change", customize); 
document.getElementById("mi").addEventListener("change", submit); 
document.getElementById("mRange").addEventListener("input", submitSlider); 
document.getElementById("hi").addEventListener("change", submit); 
document.getElementById("hRange").addEventListener("input", submitSlider); 
document.getElementById("ni").addEventListener("change", submit); 
document.getElementById("nRange").addEventListener("input", submitSlider); 

document.getElementById("tspan").addEventListener("change", submit); 
document.getElementById("iinput").addEventListener("change", submit); 
if(!userVCFlag.checked && !userVC2Flag.checked){
document.getElementById("duration").addEventListener("change", submit); 
}
else{
	document.getElementById("duration").addEventListener("change", VCsubmit);
}
document.getElementById("rv").addEventListener("change", submit); 
document.getElementById("iinput2").addEventListener("change", submit); 
document.getElementById("duration2").addEventListener("change", submit); 
document.getElementById("rv2").addEventListener("change", submit);  
document.getElementById("durationHH").addEventListener("change", submit); 

document.getElementById("seg").addEventListener("change", submit);
document.getElementById("iinputd").addEventListener("change", submit);
document.getElementById("gcoup").addEventListener("change", submit);
document.getElementById("currentinj").addEventListener("change", submit);
document.getElementById("d_dend").addEventListener("change", submit);
document.getElementById("l_dend").addEventListener("change", submit);
document.getElementById("d_soma").addEventListener("change", submit);





function VCcheck(event) {
	event.preventDefault(); 

	if (userVCFlag.checked && !userVC2Flag.checked) {
		VC = 1; 
		userVCpanel.classList.remove("hidden"); 
		userVCpanel.classList.add("shown"); 
		userVC2panel.classList.add("hidden");
		userVC2panel.classList.remove("shown");
		userHHpanel2.classList.add("hidden");
		userHHpanel2.classList.remove("shown");
		useriinput.disabled = true; 
		userrv.disabled = true; 
		// userParapanel.classList.remove("shown"); 
		// userParapanel.classList.add("hidden"); 
		useriinput.classList.remove("shown"); 
		useriinput.classList.add("hidden"); 
		document.getElementById("iinputlabel").style.display = 'none';
		userrv.classList.remove("shown"); 
		userrv.classList.add("hidden"); 
		document.getElementById("rvlabel").style.display = 'none';

		//usercurd.value = 25; 
		usercurd.value = 1; 
		var words = document.getElementById("text");
		words.innerHTML = "HH Model";
		VCsubmit(event); 
	} else if (!userVCFlag.checked && !userVC2Flag.checked){
		VC = 0; 
		userVCpanel.classList.remove("shown"); 
		userVCpanel.classList.add("hidden"); 
		userVC2panel.classList.add("hidden");
		userVC2panel.classList.remove("shown");
		userHHpanel2.classList.add("shown");
		userHHpanel2.classList.remove("hidden");
		useriinput.disabled = false; 
		userrv.disabled = false; 
		// userParapanel.classList.remove("hidden"); 
		// userParapanel.classList.add("shown"); 
		useriinput.classList.remove("hidden"); 
		useriinput.classList.add("shown"); 
		document.getElementById("iinputlabel").style.display = 'inline';
		userrv.classList.remove("hidden"); 
		userrv.classList.add("shown"); 
		document.getElementById("rvlabel").style.display = 'inline';
		var words = document.getElementById("text");
		words.innerHTML = "HH Model settings 1";
		submit(event); 
	}
	else if(userVC2Flag.checked && !userVCFlag.checked){
		userVC2panel.classList.remove("hidden"); 
		userVC2panel.classList.add("shown"); 
		userVCpanel.classList.remove("hidden"); 
		userVCpanel.classList.add("shown"); 
		useriinput.disabled = true; 
		userrv.disabled = true; 
		// userParapanel.classList.remove("shown"); 
		// userParapanel.classList.add("hidden"); 
		useriinput.classList.remove("shown"); 
		useriinput.classList.add("hidden"); 
		document.getElementById("iinputlabel").style.display = 'none';
		userrv.classList.remove("shown"); 
		userrv.classList.add("hidden"); 
		document.getElementById("rvlabel").style.display = 'none';
		userHHpanel2.classList.add("hidden");
		userHHpanel2.classList.remove("shown");
		//usercurd.value = 25; 
		usercurd.value = 1; 
		var words = document.getElementById("text");
		words.innerHTML = "HH Model";
		VCsubmit(event); 
	}
	else if(!userVC2Flag.checked){
		userVC2panel.classList.remove("shown");
		userVC2panel.classList.add("hidden");
		userVCpanel.classList.remove("shown"); 
		userVCpanel.classList.add("hidden"); 
		userHHpanel2.classList.add("shown");
		userHHpanel2.classList.remove("hidden");
		useriinput.disabled = false; 
		userrv.disabled = false; 
		// userParapanel.classList.remove("hidden"); 
		// userParapanel.classList.add("shown"); 
		useriinput.classList.remove("hidden"); 
		useriinput.classList.add("shown"); 
		document.getElementById("iinputlabel").style.display = 'inline';
		userrv.classList.remove("hidden"); 
		userrv.classList.add("shown"); 
		document.getElementById("rvlabel").style.display = 'inline';
		document.getElementById("pbottom2").classList.add("shown");
		document.getElementById("pbottom2").classList.remove("hidden");
		var words = document.getElementById("text");
		words.innerHTML = "HH Model settings 1";
		submit(event); 
	}
	else if(userVC2Flag.checked){
		userVC2panel.classList.remove("hidden"); 
		userVC2panel.classList.add("shown"); 
		userVCpanel.classList.remove("hidden"); 
		userVCpanel.classList.add("shown"); 
		useriinput.disabled = true; 
		userrv.disabled = true; 
		// userParapanel.classList.remove("shown"); 
		// userParapanel.classList.add("hidden"); 
		useriinput.classList.remove("shown"); 
		useriinput.classList.add("hidden"); 
		document.getElementById("iinputlabel").style.display = 'none';
		userrv.classList.remove("shown"); 
		userrv.classList.add("hidden"); 
		document.getElementById("rvlabel").style.display = 'none';
		userHHpanel2.classList.add("hidden");
		userHHpanel2.classList.remove("shown");
		//usercurd.value = 25; 
		usercurd.value = 1; 
		var words = document.getElementById("text");
		words.innerHTML = "HH Model";
		VCsubmit(event); 

	}
}

window.addEventListener("load", (event) => {
  initialize(); 
});

function resetPanel(event) {
	event.preventDefault(); 
	
	tspan = 25; 
	I = 0.1; 
	curd = 1; 
	v = -60; 
	mi = alphaM(v)/(alphaM(v)+betaM(v)); 
	hi = alphaH(v)/(alphaH(v)+betaH(v)); 
	ni = alphaN(v)/(alphaN(v)+betaN(v));  
	m2 = alphaM(v)/(alphaM(v)+betaM(v)); 
	h2 = alphaH(v)/(alphaH(v)+betaH(v)); 
	n2 = alphaN(v)/(alphaN(v)+betaN(v));  
	clampv = 0; 
	clamptime=0;
	restv = -60; 

	VQ = []; 
	inaQ = []; 
	ikQ = []; 
	ittQ = []; 

	if (userVCFlag.checked) {curd =1;} 

	initialize(); 
}

function initialize() {
	usermi.value = mi; 
	usermRange.value = mi; 
	userhi.value = hi; 
	userhRange.value = hi; 
	userni.value = ni; 
	usernRange.value = ni; 
	usertspan.value = tspan; 
	useriinput.value = I; 
	useriinput2.value = 0;
	usercurd.value = curd; 
	usercurd2.value = 0;
	userrv.value = v; 
	userrv2.value = v;
	userclampV.value = clampv; 
	userclamptime.value=clamptime;
	userrestV.value = restv;
	userdurationHH.value = time;
	usergcoup.value = g_coupl;
	userseg.value = nSegments;
	useriinputd.value = synLoc;
	usercurrentinj.value = 1;
	userd_dend.value = d_dend;
	userd_soma.value = d_soma;
	userl_dend.value = l_dend;

  	
	if (VC) {
		buildVC(); 
		VCdraw(); 

		oldV = V.slice(); 
		oldina = ina.slice(); 
		oldik = ik.slice(); 
		olditt = itt.slice(); 

		buildQ(VQ, V.slice()); 
		buildQ(inaQ, ina.slice()); 
		buildQ(ikQ, ik.slice()); 
		buildQ(ittQ, itt.slice()); 
	} else {
		buildHH(); 
		draw(); 

		oldV = V.slice(); 
		oldina = ina.slice(); 
		oldik = ik.slice(); 
		olditt = itt.slice(); 

		buildQ(VQ, V.slice()); 
		buildQ(inaQ, ina.slice()); 
		buildQ(ikQ, ik.slice()); 
		buildQ(ittQ, itt.slice()); 
	}

	
}

function submitSlider(event) { 
	event.preventDefault(); 
	usermi.value = usermRange.value; 
	userhi.value = userhRange.value; 
	userni.value = usernRange.value; 
	submit(event); 
}

function submit(event) {
  event.preventDefault(); 

  if (VC) {
  	VCsubmit(event); 
  } 

  else {
	if(userDendrite.checked){
		userDpanel.classList.add("shown");
		userDpanel.classList.remove("hidden");
		userHHpanel2.classList.add("hidden");
		userHHpanel2.classList.remove("shown");
	}
	else{		
		userDpanel.classList.remove("shown");
		userDpanel.classList.add("hidden");
		userHHpanel2.classList.remove("hidden");
		userHHpanel2.classList.add("shown");

	}
  	oldV = V.slice(); 
  	oldina = ina.slice(); 
	oldik = ik.slice(); 
	olditt = itt.slice(); 

	buildQ(VQ, V.slice()); 
	buildQ(inaQ, ina.slice()); 
	buildQ(ikQ, ik.slice()); 
	buildQ(ittQ, itt.slice()); 
  	
  	foolProve(); 
  	tspan = parseFloat(usertspan.value); 
  	I = parseFloat(useriinput.value); 
  	curd = parseFloat(usercurd.value); 
  	v = parseFloat(userrv.value); 
	I2 = parseFloat(useriinput2.value);
	curd2 = parseFloat(usercurd2.value);
	v = parseFloat(userrv2.value);
	time = parseFloat(userdurationHH.value);
	nSegments = parseFloat(userseg.value);
	synLoc = parseFloat(useriinputd.value);
	g_coupl = parseFloat(usergcoup.value);
	currentinj = parseFloat(usercurrentinj.value);
	d_soma = parseFloat(userd_soma.value);
	l_dend = parseFloat(userl_dend.value);
	d_dend = parseFloat(userd_dend.value);

  	usermRange.value = usermi.value; 
  	userhRange.value = userhi.value; 
  	usernRange.value = userni.value; 
  
  	mi = parseFloat(usermi.value); 
  	hi = parseFloat(userhi.value);
  	ni = parseFloat(userni.value); 

	A_soma = 4*Math.PI*(d_soma/2)^2;
	A_seg = 2*Math.PI*(d_dend/2)*l_seg;
	R_seg = d_dend*l_dend/(2*d_soma*nSegments)*R_input;
	tauM_seg = R_seg*1e6*C_M*1e-12*1e3;
	l_seg = l_dend/nSegments;

  
  	buildHH(); 
  	draw(); 
  }

  
}

function buildHH() {
	t = []; 
	V = []; 
	m = []; 
	h = []; 
	n = []; 
	ina = []; 
	ik = []; 
	il = []; 
	fik = []; 
	fina = []; 
	curinj = []; 
	curinjt = []; 
	curinj2=[];
	curinjt2=[];
	itt = []; 
	vMembrane=[restv];
	for(var i=0; i<10; i++)[
		vDend[i]=[restv]
	]
	hhrun(); 
}

function hhrun() {
	var loop = Math.ceil(tspan/dt);   // no. of iterations of euler 
	var loop1 = Math.ceil(curd/dt);
	var loop2;
	var loop3; //loop until current inj is over
	if(!userDendrite.checked){
	loop2 = Math.ceil(time/dt) +loop1; //duration is over
	loop3 = Math.ceil(curd2/dt) +loop2;
	} //last current inj
	else{
		loop2=0;
		loop3=0;
	}

	t.push(0); 
	V.push(v); 

	if (usercustomFlag.checked) {
		m.push(mi); 
		n.push(ni); 
		h.push(hi); 
	} else {
		m.push(alphaM(v)/(alphaM(v)+betaM(v))); 
		h.push(alphaH(v)/(alphaH(v)+betaH(v))); 
		n.push(alphaN(v)/(alphaN(v)+betaN(v))); 

		usermi.value = m[0]; 
		usermRange.value = m[0]; 
		userni.value = n[0]; 
		usernRange.value = n[0]; 
		userhi.value = h[0]; 
		userhRange.value = h[0]; 
	}
	var currLeft;
	var currRight;
	var vLeft=[];
	var vRight=[];

	ina.push(gNa*Math.pow(m[0],3)*h[0]*(V[0]-eNa)); 
	ik.push(gK*Math.pow(n[0],4)*(V[0]-eK)); 
	il.push(gL*(V[0]-eL)); 
	itt.push(ina[0]+ik[0]+il[0]); 

	for (var i = 1; i < offset+1; i++) {
		t.push(i*dt); 
		V.push(V[i-1] + dt*(1/Cm)*(0-(ina[i-1] + ik[i-1] + il[i-1]))); 
		m.push(m[i-1] + dt*(alphaM(V[i-1])*(1-m[i-1]) - betaM(V[i-1])*m[i-1])); 
		h.push(h[i-1] + dt*(alphaH(V[i-1])*(1-h[i-1]) - betaH(V[i-1])*h[i-1])); 
		n.push(n[i-1] + dt*(alphaN(V[i-1])*(1-n[i-1]) - betaN(V[i-1])*n[i-1])); 
		ina.push(gNa*Math.pow(m[i],3)*h[i]*(V[i]-eNa)); 
		ik.push(gK*Math.pow(n[i],4)*(V[i]-eK)); 
		il.push(gL*(V[i]-eL)); 
		itt.push(ina[i]+ik[i]+il[i]);
		if(userDendrite.checked){
		for(var j=0; j<nSegments; j++){
			vDend[j].push(restv);
		}
	}
	}

	var bAP = 0;
	if(synLoc==0 || !userDendrite.checked){
	for (var i = offset; i < loop; i++) {
		t.push(tspan*(i+1)/loop); 
		if (i-offset < loop1) {
			V.push(V[i] + dt*(1/Cm)*(I-(Ich = ina[i] + ik[i] + il[i]))); 
			curinjt.push(tspan*(i)/loop); 
			curinj.push(I); 
		} else if((i-offset)>=loop1 && i-offset<loop2){
			V.push(V[i] + dt*(1/Cm)*(0-(Ich = ina[i] + ik[i] + il[i]))); 
		}
		else if(i-offset>=loop2 && i-offset<loop3){
			V.push(V[i] + dt*(1/Cm)*(I2-(Ich = ina[i] + ik[i] + il[i]))); 
			curinjt2.push(tspan*(i)/loop); 
			curinj2.push(I); 
		}
		else if(i-offset>=loop2){
			V.push(V[i] + dt*(1/Cm)*(0-(Ich = ina[i] + ik[i] + il[i])));
		}
	

		m.push(m[i] + dt*(alphaM(V[i])*(1-m[i]) - betaM(V[i])*m[i])); 
		h.push(h[i] + dt*(alphaH(V[i])*(1-h[i]) - betaH(V[i])*h[i])); 
		n.push(n[i] + dt*(alphaN(V[i])*(1-n[i]) - betaN(V[i])*n[i])); 
		
		ina.push(gNa*Math.pow(m[i+1],3)*h[i+1]*(V[i+1]-eNa)); 
		ik.push(gK*Math.pow(n[i+1],4)*(V[i+1]-eK)); 
		il.push(gL*(V[i+1]-eL)); 
		itt.push(ina[i+1]+ik[i+1]+il[i+1]); 


		if(userDendrite.checked){
		for(var j=0; j<nSegments; j++){
			vDendCurr = vDend[j];
			if(j==0){
				vLeft = V;
			}
			else{
				vLeft = vDend[j-1];
			}
			currLeft = g_coupl*1e-9/(A_seg*1e-6)*(vLeft[i]-vDendCurr[i]);
			if(j==nSegments-1){
				currRight=0;
			}
			else{
				vRight = vDend[j+1];
				currRight = g_coupl*1e-9/(A_seg*1e-6)*(vRight[i]-vDendCurr[i]);
			}
			if(synLoc==j+1){
				vDendCurr.push(vDendCurr[i]+dt*(1/C_M)*(I));

			}
			else{
				vDendCurr.push(vDendCurr[i]+dt*(1/C_M)*(currLeft+currRight));
			}
			vDend[j]=vDendCurr;
		}
	}
}
}
else{
	for(var i = offset; i < loop; i++){
	t.push(tspan*(i+1)/loop); 
	for(var j=0; j<nSegments; j++){
		vDendCurr = vDend[j];
		if(j==0){
			vLeft = V;
		}
		else{
			//eval('vMem = vMembrane_'+j+';');
			vLeft = vDend[j-1];
		}
		currLeft = g_coupl*1e-9/(A_seg*1e-6)*(vLeft[i]-vDendCurr[i]);
		if(j==nSegments-1){
			currRight=0;
		}
		else{
			//eval('vMem = vMembrane_'+(j+1).toString()+';');
			vRight = vDend[j+1];
			currRight = g_coupl*1e-9/(A_seg*1e-6)*(vRight[i]-vDendCurr[i]);
		}
		if(synLoc==j+1){
			//vDendCurr.push(vDendCurr[i]+deltaT/(tauM_seg*1e-3)*(R_seg*1e6*(currLeft+currRight-currentinj)+E_leak*1e-3-vDendCurr[i]));
			if(i-offset<loop1){
			vDendCurr.push(vDendCurr[i]+dt*(1/C_M)*(currentinj-(currLeft+currRight)));
			}
			else{
				vDendCurr.push(vDendCurr[i]+dt*(1/C_M)*(currLeft+currRight));
			}
		}
		else{
			//vDendCurr.push(vDendCurr[i]+deltaT/(tauM_seg*1e-3)*(R_seg*1e6*(currLeft+currRight)+E_leak*1e-3-vDendCurr[i]));	
			vDendCurr.push(vDendCurr[i]+dt*(1/C_M)*(currLeft+currRight));
		}
		vDend[j]=vDendCurr;
	}
	if(synLoc>0){
		vRight=vDend[0];
		currRight = g_coupl*1e-9/(A_soma*1e-6)*(vRight[i]-V[i]);
		V.push(V[i]+dt*(1/C_M)*(currRight-(Ich = ina[i] + ik[i] + il[i])));

		m.push(m[i] + dt*(alphaM(V[i])*(1-m[i]) - betaM(V[i])*m[i])); 
		h.push(h[i] + dt*(alphaH(V[i])*(1-h[i]) - betaH(V[i])*h[i])); 
		n.push(n[i] + dt*(alphaN(V[i])*(1-n[i]) - betaN(V[i])*n[i])); 
		
		ina.push(gNa*Math.pow(m[i+1],3)*h[i+1]*(V[i+1]-eNa)); 
		ik.push(gK*Math.pow(n[i+1],4)*(V[i+1]-eK)); 
		il.push(gL*(V[i+1]-eL)); 
		itt.push(ina[i+1]+ik[i+1]+il[i+1]); 
	}	
}
	
	
}
for (var i = 0; i < ina.length; i++) {
	fik.push(-ik[i]); 
	fina.push(-ina[i]); 
}


/*else{
	for(var i=0; i<ite-1; i++){
		t.push(i*dt);
	for(var j=0; j<nSegments; j++){
		vDendCurr = vDend[j];
		if(j==0){
			vLeft = vMembrane;
		}
		else{
			//eval('vMem = vMembrane_'+j+';');
			vLeft = vDend[j-1];
		}
		currLeft = g_coupl*1e-9/A_seg*(vLeft[i]-vDendCurr[i]);
		if(j==nSegments-1){
			currRight=0;
		}
		else{
			//eval('vMem = vMembrane_'+(j+1).toString()+';');
			vRight = vDend[j+1];
			currRight = g_coupl*1e-9/A_seg*(vRight[i]-vDendCurr[i]);
		}
		if(synLoc==j+1){
			vDendCurr.push(vDendCurr[i]+deltaT/(tauM_seg*1e-3)*(R_seg*1e6*(currLeft+currRight-currentinj)+E_leak*1e-3-vDendCurr[i]));
		}
		else{
			vDendCurr.push(vDendCurr[i]+deltaT/(tauM_seg*1e-3)*(R_seg*1e6*(currLeft+currRight)+E_leak*1e-3-vDendCurr[i]));	
		}
		vDend[j]=vDendCurr;
	}
	if(spikingNow){
		vMembrane.push(AP_reset*1e-3);
		spikingNow=false;
	}
	else{
		if(synLoc>0){
			vRight=vMembrane_1;
			currRight = g_coupl*1e-9/A_soma*(vRight[i]-vMembrane[i]);
			vMembrane.push(vMembrane[i]+deltaT/(tauM*1e-3)*(R_input*1e6*(+currRight)+E_leak*1e-3-vMembrane[i]));
		}
		else if(synLoc==0){
			vRight = vMembrane_1;
			currRight = g_coupl*1e-9/A_soma*(vRight[i]-vMembrane[i]);
			vMembrane.push(vMembrane[i]+deltaT/(tauM*1e-3)*(R_input*1e6*(-currentinj+currRight)+E_leak*1e-3-vMembrane[i]));
		}
		else if(nSegments==0){
			vMembrane.push(vMembrane[i]+deltaT/(tauM*1e-3)*(R_input*1e6*(-currentinj)+E_leak*1e-3-vMembrane[i]));
		}
		if(vMembrane[i+1]>AP_threshold*1e-3){
			vMembrane.push(AP_max*1e-3);
			spikingNow=true;
		}
	}
}*/
}

/*function drun(){
	var l_seg = l_dend/nSegments;
	var A_soma = 4*Math.PI*(d_soma/2)^2;
	var A_seg = 2*Math.PI*(d_dend/2)*l_seg;
	var R_seg = d_dend*l_dend/(2*d_soma*nSegments)*R_input;
	var tauM_seg = R_seg*1e6*C_M*1e-12*1e3;
	var i=0; 
	var vDend=[];
	vMembrane.push*(E_leak*1e-3);
	vDend.push(vMembrane[0]);
	for(var i=0; i<nSegments; i++){
		var p = (i+1).toString();
		eval("var vMembrane_"+p+";");
		var membrane;
		eval("membrane = vMembrane"+p+";");
		vDend = membrane;
	}

	var currLeft;
	var currRight;
	var vLeft=[];
	var vRight=[];
	for(var i=0; i<n-1; i++){
	for(var j=0; j<nSegments; j++){
		var p = (j+1).toString();
		var k = (j+2).toString();
		eval("vDend = vMembrane_"+p+";");
		if(j==0){
			vLeft.push(vMembrane);
		}
		else{
			eval("vMem = vMembrane_"+j+";");
			vLeft.push(vMem);
		}
		currLeft = g_coupl*1e-9/A_seg*(vLeft[i]-vDend[i]);

		if(j==nSegments-1){
			currRight=0;
		}
		else{
			eval("vMem2= vMembrane_"+k+";");
			vRight.push(vMem2);
			currRight = g_coupl*1e-9/A_seg*(vRight[i]-vDend[i]);
		}
		if(synLoc=j+1){
			vDend[i+1]=vDend[i]+deltaT/(tauM_seg*1e-3)*(R_seg*1e6*(currLeft+currRight-totalCurr2)+E_leak*1e-3-vDend[i]);
		}
		else{
			vDend[i+1] = vDend[i]+deltaT/(tauM_seg*1e-3)*(R_seg*1e6*(+currLeft+currRight)+E_leak*1e-3-vDend[i])
		}
	}
}
}*/


function draw() {

	if(!userDendrite.checked){
	var Vt = {
		x:t,
  		y: V,
  		type: 'scatter', 
  		name: 'V<sub>m</sub>', 
  		line: {
    		color: 'rgb(219, 64, 82)',
    		width: 2
    	}
  	}; 
}
else{
	var Vt = {
		x: t,
		y: V,
		type: 'scatter', 
		name: 'V<sub>membrane</sub>', 
		line: {
		  color: 'rgb(219, 64, 82)',
		  width: 2
	  }
	}; 
	for(var i=0; i<nSegments; i++){
		var value = 100-i*5
	var Vtt = {
		x: t,
		y: vDend[i],
		type: 'scatter', 
		name: 'V<sub>m</sub>'+i, 
		line: {
		  color: 'rgba(219, 64, 82,'+value+')',
		  width: 2
	  }
	}; 
	window["V"+i] = JSON.parse(JSON.stringify(Vtt));	
}
}
  	var oldVt = {
  		x: t,
  		y: oldV,
  		type: 'scatter', 
  		mode: 'lines',
  		name: 'last trace', 
  		line: {
    		color: 'rgb(255, 165, 0)',
    		width: 1.5,
			dash: 'dot'
    	}
  	};

  	var mt = {
  		x: t,
  		y: m,
  		type: 'scatter', 
  		name: 'm', 
  		line: {
    		color: 'rgb(55, 128, 191)',
    		width: 2
    	}
  	}; 

  	var nt = {
  		x: t,
  		y: n,
  		type: 'scatter', 
  		name: 'n', 
  		line: {
    		color: 'rgb(124, 252, 0)',
    		width: 2
    	}
  	}; 

  	var ht = {
  		x: t,
  		y: h,
  		type: 'scatter', 
  		name: 'h', 
  		line: {
    		color: 'rgb(255, 165, 0)',
    		width: 2
    	}
  	}; 

  	var Ina = {
  		x: t,
  		y: ina,
  		type: 'scatter', 
  		name: 'I<sub>Na</sub>', 
  		line: {
    		color: 'rgb(55, 128, 191)',
    		width: 2
    	}
  	}; 

  	var oldIna = {
  		x: t,
  		y: oldina,
  		type: 'scatter', 
  		mode: 'lines',
  		name: 'last I<sub>Na</sub>', 
  		line: {
    		color: 'rgb(51, 181, 229)',
    		width: 1.5,
			dash: 'dot'
    	}
  	};

  	var Ik = {
  		x: t,
  		y: ik,
  		type: 'scatter', 
  		name: 'I<sub>K</sub>', 
  		line: {
    		color: 'rgb(124, 252, 0)',
    		width: 2
    	}
  	}; 

  	var oldIk = {
  		x: t,
  		y: oldik,
  		type: 'scatter', 
  		mode: 'lines',
  		name: 'last I<sub>K</sub>', 
  		line: {
    		color: 'rgb(34, 139, 34)',
    		width: 1.5,
			dash: 'dot'
    	}
  	};

  	var Il = {
  		x: t,
  		y: il,
  		type: 'scatter', 
  		name: 'I<sub>leak</sub>', 
  		line: {
    		color: 'rgb(255, 165, 0)',
    		width: 2
    	}
  	}; 

  	var fIk = {
  		x: t,
  		y: fik,
  		type: 'scatter', 
  		name: 'flipped I<sub>K</sub>', 
  		line: {
    		color: 'rgb(124, 252, 0)',
    		width: 2
    	}
  	}; 

  	var fIna = {
  		x: t,
  		y: fina,
  		type: 'scatter', 
  		name: 'flipped I<sub>Na</sub>', 
  		line: {
    		color: 'rgb(55, 128, 191)',
    		width: 2
    	}
  	}; 
  	
  	var curinjm = {
  		x: curinjt,
  		y: curinj,
  		type: 'scatter', 
  		name: 'I<sub>input</sub>', 
  		line: {
    		color: 'rgb(0, 0, 0)',
    		width: 3
    	}
  	}; 

	var curinjm2 = {
		x:curinjt2,
		y:curinj2,
		type: 'scatter', 
		name: 'I<sub>input</sub>', 
		line: {
		  color: 'rgb(0, 0, 0)',
		  width: 3
	  }
	}; 

  	var Itt = {
  		x: t,
  		y: itt,
  		type: 'scatter', 
  		name: 'I<sub>t</sub>', 
  		line: {
    		color: 'rgb(0, 0, 0)',
    		width: 1.5
    	}
  	}; 

  	var oldItt = {
  		x: t,
  		y: olditt,
  		type: 'scatter', 
  		mode: 'lines',
  		name: 'last I<sub>t</sub>', 
  		line: {
    		color: 'rgb(128, 128, 128)',
    		width: 1.5,
			dash: 'dot'
    	}
  	};

  	if (userlast10Flag.checked) {
  		var oldtraces = preparettQ(ittQ); 
  		oldtraces.push(Itt); 
  		oldtraces.reverse(); 

  		var oldVtraces = prepareVQ(VQ); 
  		oldVtraces.push(curinjm); 
  		oldVtraces.push(Vt); 
  		oldVtraces.reverse(); 

  		var oldNatraces = prepareNaQ(inaQ); 
  		var oldKtraces = prepareKQ(ikQ); 
  		var oldItraces = oldKtraces.concat(oldNatraces); 
  		oldItraces.push(Il); 
  		oldItraces.push(Ik); 
  		oldItraces.push(Ina); 
  		oldItraces.reverse(); 

  		Plotly.newPlot('myDiv1', oldVtraces, layout, config); 
  		Plotly.newPlot('myDiv2', oldItraces, layout8, config); 
  		// Plotly.newPlot('myDiv3', [mt, nt, ht], layout9, config); 
  		Plotly.newPlot('myDiv4', oldtraces, layout10, config); 
  	} else if (userlastFlag.checked) {
  		Plotly.newPlot('myDiv1', [Vt, oldVt, curinjm, curinjm2], layout, config); 
  		Plotly.newPlot('myDiv2', [Ina, oldIna, Ik, oldIk, Il], layout8, config); 
  		// Plotly.newPlot('myDiv3', [mt, nt, ht], layout9, config); 
  		Plotly.newPlot('myDiv4', [Itt, oldItt], layout10, config); 
  	} else {
		if(!userDendrite.checked){
  		Plotly.newPlot('myDiv1', [Vt, curinjm, curinjm2], layout, config); 
		}
		else{
			var array = [];
			array.push(Vt);
			array.push(curinjm);
			for(var i=0; i<nSegments; i++){
				eval('var Vtt = V'+i+';');
				array.push(Vtt)
			}
			Plotly.newPlot('myDiv1', array, layout, config)
		}
  		Plotly.newPlot('myDiv2', [Ina, Ik, Il], layout8, config); 
  		// Plotly.newPlot('myDiv3', [mt, nt, ht], layout9, config); 
  		Plotly.newPlot('myDiv4', [Itt], layout10, config); 
  	}
  	

  	// Plotly.newPlot('myDiv2', [Vm], layout2, config); 
  	// Plotly.newPlot('myDiv3', [Vn], layout3, config); 
  	// Plotly.newPlot('myDiv4', [Vh], layout4, config); 

  	// Plotly.newPlot('myDiv2', [Ina], layout5, config); 
  	// Plotly.newPlot('myDiv3', [Ik], layout6, config); 
  	// Plotly.newPlot('myDiv4', [Il], layout7, config); 
}

function VCsubmit(event) {
	event.preventDefault(); 

	oldV = V.slice(); 
  	oldina = ina.slice(); 
	oldik = ik.slice(); 
	olditt = itt.slice(); 

	buildQ(VQ, V.slice()); 
	buildQ(inaQ, ina.slice()); 
	buildQ(ikQ, ik.slice()); 
	buildQ(ittQ, itt.slice()); 

  	foolProve(); 
  	tspan = parseFloat(usertspan.value); 
  	I = parseFloat(useriinput.value); 
  	curd = parseFloat(usercurd.value); 
  	v = parseFloat(userrv.value); 
  	clampv = parseFloat(userclampV.value); 
	if(userVC2Flag.checked){
		clamptime = parseFloat(userclamptime.value);
	}
  	restv = parseFloat(userrestV.value); 

  	
  	usermRange.value = usermi.value; 
  	userhRange.value = userhi.value; 
  	usernRange.value = userni.value; 
  
  	mi = parseFloat(usermi.value); 
  	hi = parseFloat(userhi.value);
  	ni = parseFloat(userni.value); 
  
  	buildVC(); 
  	VCdraw(); 
} 

function buildVC() {
	t = []; 
	V = []; 
	m = []; 
	h = []; 
	n = []; 
	ina = []; 
	ik = []; 
	il = []; 
	fik = []; 
	fina = []; 
	curinj = []; 
	curinjt = []; 
	itt = []; 

	vcrun(); 
}

function vcrun() {
	var loop = Math.ceil(tspan/dt); // no. of iterations of euler 
	var loop1 = Math.ceil(curd/dt); 
	var loop2=0;
	var loop3=0;
	if(VC2.checked){
		loop1=curd/dt;
		loop2 = (clamptime+curd)/dt;
		loop3 = (clamptime+2*curd)/dt;
	}
	

	t.push(-vcoffset*dt); 
	V.push(restv); 
	if (usercustomFlag.checked) {
		m.push(mi); 
		n.push(ni); 
		h.push(hi); 
	} else {
		m.push(alphaM(v)/(alphaM(v)+betaM(v))); 
		h.push(alphaH(v)/(alphaH(v)+betaH(v))); 
		n.push(alphaN(v)/(alphaN(v)+betaN(v))); 

		usermi.value = m[0]; 
		usermRange.value = m[0]; 
		userni.value = n[0]; 
		usernRange.value = n[0]; 
		userhi.value = h[0]; 
		userhRange.value = h[0]; 
	}
	ina.push(gNa*Math.pow(m[0],3)*h[0]*(V[0]-eNa)); 
	ik.push(gK*Math.pow(n[0],4)*(V[0]-eK)); 
	il.push(gL*(V[0]-eL)); 
	itt.push(ina[0]+ik[0]+il[0]); 

	for (var i = 1; i < vcoffset; i++) {
		t.push((i-vcoffset)*dt); 
		V.push(restv); 
		m.push(m[i-1] + dt*(alphaM(V[i-1])*(1-m[i-1]) - betaM(V[i-1])*m[i-1])); 
		h.push(h[i-1] + dt*(alphaH(V[i-1])*(1-h[i-1]) - betaH(V[i-1])*h[i-1])); 
		n.push(n[i-1] + dt*(alphaN(V[i-1])*(1-n[i-1]) - betaN(V[i-1])*n[i-1])); 
		ina.push(gNa*Math.pow(m[i],3)*h[i]*(V[i]-eNa)); 
		ik.push(gK*Math.pow(n[i],4)*(V[i]-eK)); 
		il.push(gL*(V[i]-eL)); 
		itt.push(ina[i]+ik[i]+il[i]); 
	}

	for (var i = 0; i < loop; i++) {
		t.push(tspan*i/loop); 

		if(VC2.checked){
			if (i < loop1) {
				V.push(-10);
			} else if (i>=loop1 && i<loop2){
				V.push(restv); 
			}
			else if(i>loop3){
				V.push(restv);
			}
			else if(i=>loop2 && i<=loop3){
				V.push(-10); 
			}
		}
		else if(!VC2.checked){
			if(i<loop1){
				V.push(clampv);
			}
			else{
				V.push(restv);
			}

		}
		m.push(m[i+vcoffset-1] + dt*(alphaM(V[i+vcoffset-1])*(1-m[i+vcoffset-1]) - betaM(V[i+vcoffset-1])*m[i+vcoffset-1])); 
		h.push(h[i+vcoffset-1] + dt*(alphaH(V[i+vcoffset-1])*(1-h[i+vcoffset-1]) - betaH(V[i+vcoffset-1])*h[i+vcoffset-1])); 
		n.push(n[i+vcoffset-1] + dt*(alphaN(V[i+vcoffset-1])*(1-n[i+vcoffset-1]) - betaN(V[i+vcoffset-1])*n[i+vcoffset-1])); 

		ina.push(gNa*Math.pow(m[i+vcoffset],3)*h[i+vcoffset]*(V[i+vcoffset]-eNa)); 
		ik.push(gK*Math.pow(n[i+vcoffset],4)*(V[i+vcoffset]-eK)); 
		il.push(gL*(V[i+vcoffset]-eL)); 
		itt.push(ina[i+vcoffset]+ik[i+vcoffset]+il[i+vcoffset]); 
	}



	loop1 =  Math.ceil(curd/dt);
	for (var i = 0; i < ina.length; i++) {
		fik.push(-ik[i]); 
		fina.push(-ina[i]); 
	} 

	t.splice(0, vcoffset-200); 
	V.splice(0, vcoffset-200); 
	m.splice(0, vcoffset-200); 
	h.splice(0, vcoffset-200); 
	n.splice(0, vcoffset-200); 
	ina.splice(0, vcoffset-200); 
	ik.splice(0, vcoffset-200); 
	il.splice(0, vcoffset-200); 
	itt.splice(0, vcoffset-200); 
	fik.splice(0, vcoffset-200); 
	fina.splice(0, vcoffset-200); 
}

function VCdraw() {
	var Vt = {
  		x: t,
  		y: V,
  		type: 'scatter', 
  		name: 'V<sub>m</sub>', 
  		line: {
    		color: 'rgb(219, 64, 82)',
    		width: 2
    	}
  	}; 

  	var oldVt = {
  		x: t,
  		y: oldV,
  		type: 'scatter', 
  		mode: 'lines',
  		name: 'last trace', 
  		line: {
    		color: 'rgb(255, 165, 0)',
    		width: 1.5,
			dash: 'dot'
    	}
  	};

  	var mt = {
  		x: t,
  		y: m,
  		type: 'scatter', 
  		name: 'm', 
  		line: {
    		color: 'rgb(55, 128, 191)',
    		width: 2
    	}
  	}; 

  	var nt = {
  		x: t,
  		y: n,
  		type: 'scatter', 
  		name: 'n', 
  		line: {
    		color: 'rgb(124, 252, 0)',
    		width: 2
    	}
  	}; 

  	var ht = {
  		x: t,
  		y: h,
  		type: 'scatter', 
  		name: 'h', 
  		line: {
    		color: 'rgb(255, 165, 0)',
    		width: 2
    	}
  	}; 

  	var Ina = {
  		x: t,
  		y: ina,
  		type: 'scatter', 
  		name: 'I<sub>Na</sub>', 
  		line: {
    		color: 'rgb(55, 128, 191)',
    		width: 2
    	}
  	}; 

  	var oldIna = {
  		x: t,
  		y: oldina,
  		type: 'scatter', 
  		mode: 'lines',
  		name: 'last I<sub>Na</sub>', 
  		line: {
    		color: 'rgb(51, 181, 229)',
    		width: 1.5,
			dash: 'dot'
    	}
  	};

  	var Ik = {
  		x: t,
  		y: ik,
  		type: 'scatter', 
  		name: 'I<sub>K</sub>', 
  		line: {
    		color: 'rgb(124, 252, 0)',
    		width: 2
    	}
  	}; 

  	var oldIk = {
  		x: t,
  		y: oldik,
  		type: 'scatter', 
  		mode: 'lines',
  		name: 'last I<sub>K</sub>', 
  		line: {
    		color: 'rgb(34, 139, 34)',
    		width: 1.5,
			dash: 'dot'
    	}
  	};

  	var Itt = {
  		x: t,
  		y: itt,
  		type: 'scatter', 
  		name: 'I<sub>t</sub>', 
  		line: {
    		color: 'rgb(0, 0, 0)',
    		width: 1.5
    	}
  	}; 

  	var oldItt = {
  		x: t,
  		y: olditt,
  		type: 'scatter', 
  		mode: 'lines',
  		name: 'last I<sub>t</sub>', 
  		line: {
    		color: 'rgb(128, 128, 128)',
    		width: 1.5,
			dash: 'dot'
    	}
  	};



  	if (userlast10Flag.checked) {
  		var oldtraces = preparettQ(ittQ); 
  		oldtraces.push(Itt); 
  		oldtraces.reverse(); 

  		var oldVtraces = prepareVQ(VQ); 
  		oldVtraces.push(Vt); 
  		oldVtraces.reverse(); 

  		var oldNatraces = prepareNaQ(inaQ); 
  		var oldKtraces = prepareKQ(ikQ); 
  		var oldItraces = oldKtraces.concat(oldNatraces); 
  		oldItraces.push(Ik); 
  		oldItraces.push(Ina); 
  		oldItraces.reverse(); 

  		Plotly.newPlot('myDiv1', oldVtraces, layout, config); 
  		Plotly.newPlot('myDiv2', oldItraces, layout8, config); 
  		// Plotly.newPlot('myDiv2', [mt, nt, ht], layout9, config); 
  		Plotly.newPlot('myDiv4', oldtraces, layout10, config); 
  	} else if (userlastFlag.checked) {
  		Plotly.newPlot('myDiv1', [Vt, oldVt], layout, config); 
  		Plotly.newPlot('myDiv2', [Ina, oldIna, Ik, oldIk], layout8, config); 
  		// Plotly.newPlot('myDiv2', [mt, nt, ht], layout9, config); 
  		Plotly.newPlot('myDiv4', [Itt, oldItt], layout10, config); 
  	} else {
  		Plotly.newPlot('myDiv1', [Vt], layout, config); 
  		Plotly.newPlot('myDiv2', [Ina, Ik], layout8, config); 
  		// Plotly.newPlot('myDiv2', [mt, nt, ht], layout9, config); 
  		Plotly.newPlot('myDiv4', [Itt], layout10, config); 
  	}
  	
}

function alphaM(Vc) {
	var aM; 
	aM = 0.1*(Vc+35) / (1-Math.exp(-(Vc+35)/10)); 
	return aM; 
} 

function betaM(Vc) {
	var bM; 
	bM = 4*Math.exp(-(Vc+60)/18);
	return bM; 
}

function alphaH(Vc) {
	var aH; 
	aH = 0.07*Math.exp(-(Vc+60)/20); 
	return aH; 
} 

function betaH(Vc) {
	var bH; 
	bH = 1/(1+Math.exp(-(Vc+30)/10)); 
	return bH; 
} 

function alphaN(Vc) {
	var aN; 
	aN = 0.01*(Vc+50) / (1-Math.exp(-(Vc+50)/10)); 
	return aN; 
} 

function betaN(Vc) {
	var bN; 
	bN = 0.125*Math.exp(-(Vc+60)/80); 
	return bN; 
}

function foolProve() {
	if (usermi.value < 0) {usermi.value = 0;} 
	if (usermi.value > 1) {usermi.value = 1;} 
	if (userhi.value < 0) {userhi.value = 0;} 
	if (userhi.value > 1) {userhi.value = 1;} 
	if (userni.value < 0) {userni.value = 0;} 
	if (userni.value > 1) {userni.value = 1;} 
	if (usertspan.value < 1) {usertspan.value = 1;} 
	if (usercurd.value < 0) {usercurd.value = 0;}
	if (userrv.value == -35) {userrv.value = -34.999;}
	if (userrv.value == -50) {userrv.value = -49.999;}
	if (userrestV.value == -35) {userrestV.value = -34.999;}
	if (userrestV.value == -50) {userrestV.value = -49.999;}
	if (userclampV.value == -35) {userclampV.value = -34.999;}
	if (userclampV.value == -50) {userclampV.value = -49.999;}
} 

function checkMode(event) {
	event.preventDefault(); 
	userlast10Flag.checked = false; 
	if (VC) {VCdraw();} else {draw();}
} 

function checkMode10(event) {
	event.preventDefault(); 
	userlastFlag.checked = false; 
	if (VC) {VCdraw();} else {draw();}
}


function customize(event) {
	event.preventDefault(); 

	if (usercustomFlag.checked) {
		usermi.disabled = false; 
		usermRange.disabled = false; 
		userni.disabled = false; 
		usernRange.disabled = false; 
		userhi.disabled = false; 
		userhRange.disabled = false; 
		submit(event); 
	} else {
		usermi.disabled = true; 
		usermRange.disabled = true; 
		userni.disabled = true; 
		usernRange.disabled = true; 
		userhi.disabled = true; 
		userhRange.disabled = true; 
	}
} 

function blocker(event) {
	event.preventDefault(); 

	if (userTTX.checked) {gNa = 0;} else {gNa = 1.2;} 
	if (userTEA.checked) {gK = 0;} else {gK = 0.36;} 

	submit(event); 
} 

function buildQ(traceQ, trace) {
	if (traceQ.length < 10) {
		traceQ.push(trace); 
	} else {
		traceQ.shift(); 
		traceQ.push(trace); 
	}
}

function preparettQ(queue) {
	var output = []; 
	for (var i = 0; i < queue.length; i++) {
		var formattedtrace = {
  		x: t,
  		y: queue[i],
  		type: 'scatter', 
  		mode: 'lines',
  		name: `I<sub>t</sub> No.${i+1}`, 
  		line: {
    		color: `rgb(${128+(queue.length-i-1)*10}, ${128+(queue.length-i-1)*10}, ${128+(queue.length-i-1)*10})`,
    		width: 1.5,
			dash: 'dot'
    		}
  		}; 

  		output.push(formattedtrace); 
	}
	return output; 
}

function prepareVQ(queue) {
	var output = []; 
	for (var i = 0; i < queue.length; i++) {
		var formattedtrace = {
  		x: t,
  		y: queue[i],
  		type: 'scatter', 
  		mode: 'lines',
  		name: `V<sub>m</sub> No.${i+1}`, 
  		line: {
    		color: `rgb(255, ${165+(queue.length-i-1)/10*(255-165)}, ${0+(queue.length-i-1)/10*(255-0)})`,
    		width: 1.5,
			dash: 'dot'
    		}
  		}; 

  		output.push(formattedtrace); 
	}
	return output; 
}

function prepareNaQ(queue) {
	var output = []; 
	for (var i = 0; i < queue.length; i++) {
		var formattedtrace = {
  		x: t,
  		y: queue[i],
  		type: 'scatter', 
  		mode: 'lines',
  		name: `I<sub>Na</sub> No.${i+1}`, 
  		line: {
    		color: `rgb(${51+(queue.length-i-1)/10*(229-51)}, ${181+(queue.length-i-1)/10*(229-181)}, 229)`,
    		width: 1.5,
			dash: 'dot'
    		}
  		}; 

  		output.push(formattedtrace); 
	}
	return output; 
}

function prepareKQ(queue) {
	var output = []; 
	for (var i = 0; i < queue.length; i++) {
		var formattedtrace = {
  		x: t,
  		y: queue[i],
  		type: 'scatter', 
  		mode: 'lines',
  		name: `I<sub>K</sub> No.${i+1}`, 
  		line: {
    		color: `rgb(${34+(queue.length-i-1)/10*(224-34)}, ${139+(queue.length-i-1)/10*(224-139)}, ${34+(queue.length-i-1)/10*(224-34)})`,
    		width: 1.5,
			dash: 'dot'
    		}
  		}; 

  		output.push(formattedtrace); 
	}
	return output; 
}