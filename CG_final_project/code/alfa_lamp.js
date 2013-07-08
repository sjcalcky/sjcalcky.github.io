// Stefano Calcaterra, 405769
// Final Project - Lampada Alfa

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


//////////////////////////////////////////////////////////// TOTALE ////////////////////////////////////////////////////////////
DRAW(STRUCT([COLOR([0.2,0.2,0.2])(base), COLOR([0.6,0.6,0.6])(corpo), COLOR([2,1.9,1.8])(paralume)]));
