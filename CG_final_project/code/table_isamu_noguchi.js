// Stefano Calcaterra, 405769
// Final Project - Tavolino Isamu Noguchi


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


var dom1 = PROD1x1([INTERVALS(1)(36),INTERVALS(1)(36)]);

//////////////////////////////////////////////////////////// piano superiore ////////////////////////////////////////////////////////////

/* //curve di riferimento
var x = MAP(BEZIER(S0)([[-6.4,0,0],[6.4,0,0]]))(dom1);
var mediana = MAP(BEZIER(S0)([[0,0,0],[0,9.3,0]]))(dom1);
var y = MAP(BEZIER(S0)([[-6.4,0,0],[-6.4,9.3,0]]))(dom1);
*/


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

/* //curve di riferimento
var x1 = MAP(BEZIER(S1)([[0,0,0],[8,0,0]]))(dom1);
var x2 = MAP(BEZIER(S1)([[0,0,4],[8,0,4]]))(dom1);
var y1 = MAP(BEZIER(S1)([[0,0,0],[0,0,4]]))(dom1);
var y2 = MAP(BEZIER(S1)([[8,0,0],[8,0,4]]))(dom1);
*/

// punti curve sinistra
var cp1_s = [[0.25,0,0],[-0.5,0,1.25],[0.7,0,4]];
var cp2_s = [[0.7,0,4],[1.25,0,4]];
var cp3_s = [[1.25,0,4],[1.8,0,1.5],[2,0,1.5],[2.2,0,1.25],[3,0,1],[4.5,0,0.75],[5.75,0,0.75],[6.2,0,1],[6.7,0,1.5],[6.75,0,2]];
var cp4_s = [[6.75,0,2],[7.25,0,2]];
var cp5_s = [[7.25,0,2],[8.5,0,0.75],[7.75,0,0]];

// punti curve base sinistra
var cp_b_1_s = [[0.25,0,0],[0.75,0,0]];
var cp_b_2_s = [[0.75,0,0],[1.25,0,0]];
var cp_b_3_s = [[1.25,0,0],[6.75,0,0]];
var cp_b_4_s = [[6.75,0,0],[7.25,0,0]];
var cp_b_5_s = [[7.25,0,0],[7.75,0,0]];

// punti curve destra
var cp1_d = sdoppia(1,0.4,cp1_s);
var cp2_d = sdoppia(1,0.4,cp2_s);
var cp3_d = sdoppia(1,0.4,cp3_s);
var cp4_d = sdoppia(1,0.4,cp4_s);
var cp5_d = sdoppia(1,0.4,cp5_s);


// punti curve base destra
var cp_b_1_d = sdoppia(1,0.4,cp_b_1_s);
var cp_b_2_d = sdoppia(1,0.4,cp_b_2_s);
var cp_b_3_d = sdoppia(1,0.4,cp_b_3_s);
var cp_b_4_d = sdoppia(1,0.4,cp_b_4_s);
var cp_b_5_d = sdoppia(1,0.4,cp_b_5_s);

// punti curve mediane (per l'effetto bombato della superficie laterale)
var cp1_med = [[0.25,0.2,0],[-1,0.2,1.25],[0.7,0.2,4]];
var cp3_med = [[1.25,0.2,4],[2.3,0.2,1.5],[2.5,0.2,2],[2.7,0.2,1.5],[3,0.2,1.5],[4.5,0.2,1.75],[5.75,0.2,1.25],[6.2,0.2,1.5],[6.7,0.2,2],[6.75,0.2,2]];
var cp5_med = [[7.25,0.2,2],[9.25,0.2,0.75],[7.75,0.2,0]];

/* //per visualizzare le curve
var c1_s = MAP(BEZIER(S0)(cp1_s))(dom1);
var c2_s = MAP(BEZIER(S0)(cp2_s))(dom1);
var c3_s = MAP(BEZIER(S0)(cp3_s))(dom1);
var c4_s = MAP(BEZIER(S0)(cp4_s))(dom1);
var c5_s = MAP(BEZIER(S0)(cp5_s))(dom1);

var c1_d = MAP(BEZIER(S0)(cp1_d))(dom1);
var c2_d = MAP(BEZIER(S0)(cp2_d))(dom1);
var c3_d = MAP(BEZIER(S0)(cp3_d))(dom1);
var c4_d = MAP(BEZIER(S0)(cp4_d))(dom1);
var c5_d = MAP(BEZIER(S0)(cp5_d))(dom1);
*/

// curve sinistra
var c1_s = BEZIER(S0)(cp1_s);
var c2_s = BEZIER(S0)(cp2_s);
var c3_s = BEZIER(S0)(cp3_s);
var c4_s = BEZIER(S0)(cp4_s);
var c5_s = BEZIER(S0)(cp5_s);

// curve base sinistra
var b1_s = BEZIER(S0)(cp_b_1_s);
var b2_s = BEZIER(S0)(cp_b_2_s);
var b3_s = BEZIER(S0)(cp_b_3_s);
var b4_s = BEZIER(S0)(cp_b_4_s);
var b5_s = BEZIER(S0)(cp_b_5_s);
var b_tot_s = BEZIER(S0)([[0.25,0,0],[7.75,0,0]]);

// curve destra
var c1_d = BEZIER(S0)(cp1_d);
var c2_d = BEZIER(S0)(cp2_d);
var c3_d = BEZIER(S0)(cp3_d);
var c4_d = BEZIER(S0)(cp4_d);
var c5_d = BEZIER(S0)(cp5_d);

// curve base destra
var b1_d = BEZIER(S0)(cp_b_1_d);
var b2_d = BEZIER(S0)(cp_b_2_d);
var b3_d = BEZIER(S0)(cp_b_3_d);
var b4_d = BEZIER(S0)(cp_b_4_d);
var b5_d = BEZIER(S0)(cp_b_5_d);
var b_tot_d = BEZIER(S0)([[0.25,0.4,0],[7.75,0.4,0]]);

// curve mediane (per l'effetto bombato della superficie laterale)
var med1 = BEZIER(S0)(cp1_med);
var med3 = BEZIER(S0)(cp3_med);
var med5 = BEZIER(S0)(cp5_med);


//DRAW(STRUCT([x1,x2,y1,y2,c1_s,c2_s,c3_s,c4_s,c5_s,c1_d,c2_d,c3_d,c4_d,c5_d]));

// superfici parziali sinistra
var s1_s = MAP(BEZIER(S1)([b1_s,c1_s]))(dom1);
var s2_s = MAP(BEZIER(S1)([b2_s,c2_s]))(dom1);
var s3_s = MAP(BEZIER(S1)([b3_s,c3_s]))(dom1);
var s4_s = MAP(BEZIER(S1)([b4_s,c4_s]))(dom1);
var s5_s = MAP(BEZIER(S1)([b5_s,c5_s]))(dom1);

// superficie sinistra intera
var sup_s = STRUCT([s1_s,s2_s,s3_s,s4_s,s5_s]);

// superfici parziali destra
var s1_d = MAP(BEZIER(S1)([c1_d,b1_d]))(dom1);
var s2_d = MAP(BEZIER(S1)([c2_d,b2_d]))(dom1);
var s3_d = MAP(BEZIER(S1)([c3_d,b3_d]))(dom1);
var s4_d = MAP(BEZIER(S1)([c4_d,b4_d]))(dom1);
var s5_d = MAP(BEZIER(S1)([c5_d,b5_d]))(dom1);

// superficie destra intera
var sup_d = STRUCT([s1_d,s2_d,s3_d,s4_d,s5_d]);

// superfici parziali laterali
var lat1 = MAP(BEZIER(S1)([c1_s,med1,c1_d]))(dom1);
var lat2 = MAP(BEZIER(S1)([c2_s,c2_d]))(dom1);
var lat3 = MAP(BEZIER(S1)([c3_s,med3,c3_d]))(dom1);
var lat4 = MAP(BEZIER(S1)([c4_s,c4_d]))(dom1);
var lat5 = MAP(BEZIER(S1)([c5_s,med5,c5_d]))(dom1);
var lat6 = MAP(BEZIER(S1)([b_tot_d,b_tot_s]))(dom1);

// superficie laterale intera
var lat_tot = STRUCT([lat1,lat2,lat3,lat4,lat5,lat6]);

// singolo elemento base
var elemento_base = STRUCT([sup_s,sup_d,lat_tot]);

//// assemblaggio base ////
var base1 = T([0,1])([1.75-6.4-0.25,1.75])(R([0,1])(PI/4)(elemento_base));
var elemento_base_ribaltato = R([1,2])(PI)(elemento_base);
var base2 = T([0,1,2])([4.7,1.75,4])(R([0,1])(3*PI/4)(elemento_base_ribaltato));

//DRAW(STRUCT([base1,base2,x,y,mediana]));

// base completa
var base = STRUCT([base1,base2]);

//////////////////////////////////////////////////////////// totale ////////////////////////////////////////////////////////////
DRAW(STRUCT([ COLOR([0.67,0.8,0.93,0.5])(piano) , COLOR([0.2,0.2,0.2])(base) ]));
