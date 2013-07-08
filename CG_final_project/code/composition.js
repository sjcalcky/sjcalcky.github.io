// Stefano Calcaterra, 405769
// Final Project - Composizione

//funzioni utili

function sdoppia (asse, val, controlpoints) { 
    
    var array_new = new Array();

    for(i=0; i<controlpoints.length; i++) {

    	var array = controlpoints[i];

       var x = array[0];
       var y = array[1];
       var z = array[2];
        if (asse == 0)
            array_new.push([x+val,y,z]);
        if (asse == 1)
            array_new.push([x,y+val,z]);
        if (asse == 2)
            array_new.push([x,y,z+val]);
       }        
    return array_new;
}

//porzione di arco pieno
function arc (alpha, r, R) {

	var domain = DOMAIN([[0,alpha],[r,R]])([36,1]);
	
	var mapping = function (v) {
		var a = v[0];
		var r = v[1];

		return [r*COS(a), r*SIN(a)];
	}

	var model = MAP(mapping)(domain);
	return model;
} 

//sfera
function sfera (alpha, r, R) {

    var domain = DOMAIN([[0,alpha],[r,R],[0,alpha]])([36,1,36]);
    
    var mapping = function (v) {
        var a = v[0];
        var r = v[1];
        var a2 = v[2];

        return [r*SIN(a2)*COS(a), r*SIN(a2)*SIN(a), r*COS(a2)];
    }

    var model = MAP(mapping)(domain);
    return model;
} 


var dom1 = PROD1x1([INTERVALS(1)(36),INTERVALS(1)(36)]);

//////////////////////////////////////////////////////////// TAVOLINO ISAMU NOGUCHI ////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////// piano superiore ////////////////////////////////////////////////////////////
var x = MAP(BEZIER(S0)([[-6.4,0,0],[6.4,0,0]]))(dom1);
var mediana = MAP(BEZIER(S0)([[0,0,0],[0,9.3,0]]))(dom1);
var y = MAP(BEZIER(S0)([[-6.4,0,0],[-6.4,9.3,0]]))(dom1);


var piano_superiore_struct_s_down = BEZIER(S0)([[0,0,0],[-1,0,0],[-2,0,0],[-16,-1,0],[-1.5,10,0],[0,9.3,0]]);
var piano_superiore_struct_d_down = BEZIER(S0)([[0,0,0],[1,0,0],[2,0,0],[16,-1,0],[1.5,10,0],[0,9.3,0]]);

var piano_superiore_struct_s_med = BEZIER(S0)([[0,-0.15,0.1],[-1,-0.15,0.1],[-2,-0.15,0.1],[-16.15,-1,0.1],[-1.5,10.15,0.1],[0,9.45,0.1]]);
var piano_superiore_struct_d_med = BEZIER(S0)([[0,-0.15,0.1],[1,-0.15,0.1],[2,-0.15,0.1],[16.15,-1,0.1],[1.5,10.15,0.1],[0,9.45,0.1]]);

var piano_superiore_struct_s_up = BEZIER(S0)([[0,0,0.2],[-1,0,0.2],[-2,0,0.2],[-16,-1,0.2],[-1.5,10,0.2],[0,9.3,0.2]]);
var piano_superiore_struct_d_up = BEZIER(S0)([[0,0,0.2],[1,0,0.2],[2,0,0.2],[16,-1,0.2],[1.5,10,0.2],[0,9.3,0.2]]);

var surf_down = MAP(BEZIER(S1)([piano_superiore_struct_s_down,piano_superiore_struct_d_down]))(dom1);
var surf_up = MAP(BEZIER(S1)([piano_superiore_struct_d_up,piano_superiore_struct_s_up]))(dom1);

var surf_lat1 = MAP(BEZIER(S1)([piano_superiore_struct_s_up, piano_superiore_struct_s_med, piano_superiore_struct_s_down]))(dom1);
var surf_lat2 = MAP(BEZIER(S1)([piano_superiore_struct_d_down,piano_superiore_struct_d_med, piano_superiore_struct_d_up]))(dom1);

var surf_tot = STRUCT([surf_down, surf_up, surf_lat1, surf_lat2]);
//DRAW(surf_tot);

var piano = T([2])([4])(surf_tot);

//////////////////////////////////////////////////////////// base ////////////////////////////////////////////////////////////


var cp1_s = [[0.25,0,0],[-0.5,0,1.25],[0.7,0,4]];
var cp2_s = [[0.7,0,4],[1.25,0,4]];
var cp3_s = [[1.25,0,4],[1.8,0,1.5],[2,0,1.5],[2.2,0,1.25],[3,0,1],[4.5,0,0.75],[5.75,0,0.75],[6.2,0,1],[6.7,0,1.5],[6.75,0,2]];
var cp4_s = [[6.75,0,2],[7.25,0,2]];
var cp5_s = [[7.25,0,2],[8.5,0,0.75],[7.75,0,0]];

var cp_b_1_s = [[0.25,0,0],[0.75,0,0]];
var cp_b_2_s = [[0.75,0,0],[1.25,0,0]];
var cp_b_3_s = [[1.25,0,0],[6.75,0,0]];
var cp_b_4_s = [[6.75,0,0],[7.25,0,0]];
var cp_b_5_s = [[7.25,0,0],[7.75,0,0]];

var cp1_d = sdoppia(1,0.4,cp1_s);
var cp2_d = sdoppia(1,0.4,cp2_s);
var cp3_d = sdoppia(1,0.4,cp3_s);
var cp4_d = sdoppia(1,0.4,cp4_s);
var cp5_d = sdoppia(1,0.4,cp5_s);

var cp_b_1_d = sdoppia(1,0.4,cp_b_1_s);
var cp_b_2_d = sdoppia(1,0.4,cp_b_2_s);
var cp_b_3_d = sdoppia(1,0.4,cp_b_3_s);
var cp_b_4_d = sdoppia(1,0.4,cp_b_4_s);
var cp_b_5_d = sdoppia(1,0.4,cp_b_5_s);

var cp1_med = [[0.25,0.2,0],[-1,0.2,1.25],[0.7,0.2,4]];
var cp3_med = [[1.25,0.2,4],[2.3,0.2,1.5],[2.5,0.2,2],[2.7,0.2,1.5],[3,0.2,1.5],[4.5,0.2,1.75],[5.75,0.2,1.25],[6.2,0.2,1.5],[6.7,0.2,2],[6.75,0.2,2]];
var cp5_med = [[7.25,0.2,2],[9.25,0.2,0.75],[7.75,0.2,0]];


var c1_s = BEZIER(S0)(cp1_s);
var c2_s = BEZIER(S0)(cp2_s);
var c3_s = BEZIER(S0)(cp3_s);
var c4_s = BEZIER(S0)(cp4_s);
var c5_s = BEZIER(S0)(cp5_s);

var b1_s = BEZIER(S0)(cp_b_1_s);
var b2_s = BEZIER(S0)(cp_b_2_s);
var b3_s = BEZIER(S0)(cp_b_3_s);
var b4_s = BEZIER(S0)(cp_b_4_s);
var b5_s = BEZIER(S0)(cp_b_5_s);
var b_tot_s = BEZIER(S0)([[0.25,0,0],[7.75,0,0]]);

var c1_d = BEZIER(S0)(cp1_d);
var c2_d = BEZIER(S0)(cp2_d);
var c3_d = BEZIER(S0)(cp3_d);
var c4_d = BEZIER(S0)(cp4_d);
var c5_d = BEZIER(S0)(cp5_d);

var b1_d = BEZIER(S0)(cp_b_1_d);
var b2_d = BEZIER(S0)(cp_b_2_d);
var b3_d = BEZIER(S0)(cp_b_3_d);
var b4_d = BEZIER(S0)(cp_b_4_d);
var b5_d = BEZIER(S0)(cp_b_5_d);
var b_tot_d = BEZIER(S0)([[0.25,0.4,0],[7.75,0.4,0]]);

var med1 = BEZIER(S0)(cp1_med);
var med3 = BEZIER(S0)(cp3_med);
var med5 = BEZIER(S0)(cp5_med);


//DRAW(STRUCT([x1,x2,y1,y2,c1_s,c2_s,c3_s,c4_s,c5_s,c1_d,c2_d,c3_d,c4_d,c5_d]));

var s1_s = MAP(BEZIER(S1)([b1_s,c1_s]))(dom1);
var s2_s = MAP(BEZIER(S1)([b2_s,c2_s]))(dom1);
var s3_s = MAP(BEZIER(S1)([b3_s,c3_s]))(dom1);
var s4_s = MAP(BEZIER(S1)([b4_s,c4_s]))(dom1);
var s5_s = MAP(BEZIER(S1)([b5_s,c5_s]))(dom1);

var sup_s = STRUCT([s1_s,s2_s,s3_s,s4_s,s5_s]);

var s1_d = MAP(BEZIER(S1)([c1_d,b1_d]))(dom1);
var s2_d = MAP(BEZIER(S1)([c2_d,b2_d]))(dom1);
var s3_d = MAP(BEZIER(S1)([c3_d,b3_d]))(dom1);
var s4_d = MAP(BEZIER(S1)([c4_d,b4_d]))(dom1);
var s5_d = MAP(BEZIER(S1)([c5_d,b5_d]))(dom1);

var sup_d = STRUCT([s1_d,s2_d,s3_d,s4_d,s5_d]);

var lat1 = MAP(BEZIER(S1)([c1_s,med1,c1_d]))(dom1);
var lat2 = MAP(BEZIER(S1)([c2_s,c2_d]))(dom1);
var lat3 = MAP(BEZIER(S1)([c3_s,med3,c3_d]))(dom1);
var lat4 = MAP(BEZIER(S1)([c4_s,c4_d]))(dom1);
var lat5 = MAP(BEZIER(S1)([c5_s,med5,c5_d]))(dom1);
var lat6 = MAP(BEZIER(S1)([b_tot_d,b_tot_s]))(dom1);

var lat_tot = STRUCT([lat1,lat2,lat3,lat4,lat5,lat6]);

var elemento_base = STRUCT([sup_s,sup_d,lat_tot]);

//// assemblaggio base ////
var base1 = T([0,1])([1.75-6.4-0.25,1.75])(R([0,1])(PI/4)(elemento_base));
var elemento_base_ribaltato = R([1,2])(PI)(elemento_base);
var base2 = T([0,1,2])([4.7,1.75,4])(R([0,1])(3*PI/4)(elemento_base_ribaltato));

//DRAW(STRUCT([base1,base2,x,y,mediana]));

var base = STRUCT([base1,base2]);

var tavolino_isamu_noguchi = STRUCT([ COLOR([0.67,0.8,0.93,0.5])(piano) , COLOR([0.2,0.2,0.2])(base) ]);

//////////////////////////////////////////////////////////// TAVOLINO DA PRANZO NOGUCHI ////////////////////////////////////////////////////////////


/////////////////////////// piano superiore ///////////////////////////
var piano_superiore_struct = EXTRUDE([0.2])(arc(2*PI, 0, 6));
var piano_superiore = T([2])([7.25])(piano_superiore_struct);

/////////////////////////// base ///////////////////////////
var alpha = BEZIER(S0)([[1,0,0.4],[1.1,0,0.4],[1.2,0,0.4],[1.3,0,0.4],[1.4,0,0.4],[1.5,0,0.4],[1.5,0,0.4],[1.8,0,0.2],[2.4,0,0.2],[2.5,0,0]]);
var alpha2 = BEZIER(S0)([[1,0,0],[1,0,0.4]]);
var alpha3= BEZIER(S0)([[1,0,0],[2.5,0,0]]);
var beta = BEZIER(S1)([[2.4,0,0],[2.4,3.05,0],[-2.4,3.05,0],[-2.4,0,0]]);


var surface1 = MAP(PROFILEPROD_SURFACE([alpha,beta]))(dom1);
var surface1_scaled = SCALE([0,1])([0.5,0.5])(surface1);

var surface2 = MAP(PROFILEPROD_SURFACE([alpha2,beta]))(dom1);
var surface2_scaled = SCALE([0,1])([0.5,0.5])(surface2);

var surface3 = MAP(PROFILEPROD_SURFACE([alpha3,beta]))(dom1);
var surface3_scaled = SCALE([0,1])([0.5,0.5])(surface3);

var base1 = STRUCT(REPLICA(2)([surface1_scaled,R([0,1])(PI)]));
var base2 = STRUCT(REPLICA(2)([surface2_scaled,R([0,1])(PI)]));
var base3 = STRUCT(REPLICA(2)([surface3_scaled,R([0,1])(PI)]));

//DRAW(STRUCT([MAP(alpha)(dom1),MAP(beta)(dom1), base1, base2]))
var base = STRUCT([base1, base2, base3]);

/////////////////////////// corpo ///////////////////////////
var elemento_corpo_d_struct = EXTRUDE([7.8])(arc(2*PI, 0, 0.03));
var elemento_corpo_ds1 = STRUCT(REPLICA(2)([elemento_corpo_d_struct,R([0,2])(PI/6)]));
var elemento_corpo_ds2 = R([0,2])(-PI/12)(elemento_corpo_ds1);
var elemento_corpo_ds = T([1,2])([-1.4,0.4])(R([1,2])(-PI/8)(elemento_corpo_ds2)); //15°

var elementi_corpo_tot = STRUCT(REPLICA(7)([elemento_corpo_ds,R([0,1])(PI/3.5)]));

var anello_struct = EXTRUDE([0.05])(arc(2*PI, 2.4, 2.5));
var anello = T([2])([7.20])(anello_struct);

var corpo = STRUCT([elementi_corpo_tot, anello]);
//DRAW(STRUCT([piano_superiore, base, elementi_corpo_tot]))

var tavolino_da_pranzo_noguchi = STRUCT([COLOR([2,2,2])(piano_superiore), COLOR([0.2,0.2,0.2])(base), COLOR([0,0,0])(corpo)]);


//////////////////////////////////////////////////////////// LAMPADA ALFA ////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////// base ////////////////////////////////////////////////////////////

var alpha_base = BEZIER(S0)([[0.55,0,0.4],[0.7,0,0.15]]);
var alpha2_base = BEZIER(S0)([[0.7,0,0.15],[0.7,0,0]]);
var alpha3_base = BEZIER(S0)([[0,0,0.4],[0.55,0,0.4]]);
var alpha4_base = BEZIER(S0)([[0,0,0],[0.7,0,0]]);

var beta_base = BEZIER(S1)([[0.7,0,0],[0.7,0.95,0],[-0.7,0.95,0],[-0.7,0,0]]);

var surface1_base = MAP(PROFILEPROD_SURFACE([alpha_base, beta_base]))(dom1);
var surface1_base_scaled = SCALE([0,1])([1.4,1.4])(surface1_base);

var surface2_base = MAP(PROFILEPROD_SURFACE([alpha2_base, beta_base]))(dom1);
var surface2_base_scaled = SCALE([0,1])([1.4,1.4])(surface2_base);

var surface3_base = MAP(PROFILEPROD_SURFACE([alpha3_base, beta_base]))(dom1);
var surface3_base_scaled = SCALE([0,1])([1.4,1.4])(surface3_base);

var surface4_base = MAP(PROFILEPROD_SURFACE([alpha4_base, beta_base]))(dom1);
var surface4_base_scaled = SCALE([0,1])([1.4,1.4])(surface4_base);

var base1 = STRUCT(REPLICA(2)([surface1_base_scaled,R([0,1])(PI)]));
var base2 = STRUCT(REPLICA(2)([surface2_base_scaled,R([0,1])(PI)]));
var base3 = STRUCT(REPLICA(2)([surface3_base_scaled,R([0,1])(PI)]));
var base4 = STRUCT(REPLICA(2)([surface4_base_scaled,R([0,1])(PI)]));


//DRAW(STRUCT([MAP(alpha_base)(dom1),MAP(beta_base)(dom1), base1, base2, base3, base4]));
var base = STRUCT([base1, base2, base3, base4]);

//////////////////////////////////////////////////////////// corpo ////////////////////////////////////////////////////////////

var corpo1 = EXTRUDE([0.45])(arc(2*PI, 0, 0.175));
var corpo2 = EXTRUDE([0.7])(arc(2*PI, 0, 0.1));
var corpo3 = EXTRUDE([0.5])(arc(2*PI, 0, 0.175));
var corpo3 = T([2])([2.8])(corpo3);
var corpo4 = EXTRUDE([5])(arc(2*PI, 0, 0.075));

var corpo5 = EXTRUDE([0.1])(arc(2*PI, 0, 0.95));
var corpo5 = T([2])([3])(corpo5);

var corpo6 = EXTRUDE([0.1])(arc(2*PI, 0, 1));
var corpo6 = T([2])([3.1])(corpo6);

var sfera = sfera(2*PI, 0, 0.3);
var sfera = T([2])([4.75])(sfera);

var corpo = STRUCT([corpo1, corpo2, corpo3, corpo4, corpo5, corpo6, sfera]);

//////////////////////////////////////////////////////////// paralume ////////////////////////////////////////////////////////////

var alpha_paralume = BEZIER(S0)([[0.9,0,3],[1.7,0,2.4],[1.6,0,1.7]]);
var beta_paralume = BEZIER(S1)([[1.6,0,1.7],[1.6,2.2,1.7],[-1.6,2.2,1.7],[-1.6,0,1.7]]);

var surface1_paralume = MAP(PROFILEPROD_SURFACE([alpha_paralume, beta_paralume]))(dom1);
var surface1_paralume_scaled = SCALE([0,1])([0.63,0.63])(surface1_paralume);

var paralume = STRUCT(REPLICA(2)([surface1_paralume_scaled,R([0,1])(PI)]));

//DRAW(STRUCT([MAP(alpha_paralume)(dom1),COLOR([1,0,0])(MAP(beta_paralume)(dom1)), paralume1]));

var lampada_alfa = STRUCT([COLOR([0.2,0.2,0.2])(base), COLOR([0.6,0.6,0.6])(corpo), COLOR([2,1.9,1.8])(paralume)]);

//////////////////////////////////////////////////////////// SEDIA TOGA ////////////////////////////////////////////////////////////

var c1 = BEZIER(S0)([[-3,0,0],[-2.5,0,3],[-2.8,0,6],[0,0,1],[0,0,1],[2.8,0,6],[2.5,0,3],[3,0,0]]);
var c2 = BEZIER(S0)([[-4.2,0.2,0],[-4.2,0.2,7],[-2.5,0.2,7],[-2.5,0.2,4],[-2.5,0.2,4],[-2.5,0.2,4],[-2.5,0.2,4],[0,0,2],[2.5,0.2,4],[2.5,0.2,4],[2.5,0.2,4],[2.5,0.2,4],[2.5,0.2,7],[4.2,0.2,7],[4.2,0.2,0]]);
var c3 = BEZIER(S0)([[-4.5,1,0],[-4.2,1,7],[-2.5,1,7],[-2.5,1,4],[-2.5,1,4],[-2.5,1,4],[-2.5,1,4],[0,1,2],[2.5,1,4],[2.5,1,4],[2.5,1,4],[2.5,1,4],[2.5,1,7],[4.2,1,7],[4.5,1,0]]);
var c4 = BEZIER(S0)([[-4.1,4,0],[-3.7,4,5],[-3,4,5],[-3,4,3.5],[-3,4,3.5],[-3,4,3.5],[-3,4,3.5],[0,4,2],[3,4,3.5],[3,4,3.5],[3,4,3.5],[3,4,3.5],[3,4,5],[3.7,4,5],[4.1,4,0]]);
var c5 = BEZIER(S0)([[-4,4.5,0],[-3,4.5,6],[-3,4.5,6],[-3,4.5,6],[0,6,5.5],[0,6,5.5],[3,4.5,6],[3,4.5,6],[3,4.5,6],[4,4.5,0]]);
var c6 = BEZIER(S0)([[-3.9,5,0],[-3,5,7.5],[-3,5,7.5],[-3,5,7.5],[0,5,5.5],[3,5,7.5],[3,5,7.5],[3,5,7.5],[3.9,5,0]]);
var c7 = BEZIER(S0)([[-3.6,6.5,0],[-3,6,7.5],[-3,6,7.5],[-3,6,7.5],[0,6,5.5],[3,6,7.5],[3,6,7.5],[3,6,7.5],[3.6,6.5,0]]);
var c8 = BEZIER(S0)([[-3,6.5,0],[-2,6,6.5],[-2,6,6.5],[-2,6,6.5],[0,6,4.5],[2,6,6.5],[2,6,6.5],[2,6,6.5],[3,6.5,0]]);


var sedia_toga = MAP(BEZIER(S1)([c1, c2,c2,c2, c3, c4, c4, c4, c4, c4, c4, c4, c5,c5,c5, c6,c6,c6,c6,c6,c6, c7, c7, c7, c8]))(dom1);
var sedia_toga = COLOR([1.3,0,0])(T([1])([8])(sedia_toga));

var sedie = STRUCT(REPLICA(2)([sedia_toga, R([0,1])(PI/2)]));

//////////////////////////////////////////////////////////// totale ////////////////////////////////////////////////////////////
DRAW(STRUCT([tavolino_isamu_noguchi, T([0,1])([19,15])(tavolino_da_pranzo_noguchi), T([1,2])([4,4.2])(lampada_alfa), T([1])([4])(sedie)]));