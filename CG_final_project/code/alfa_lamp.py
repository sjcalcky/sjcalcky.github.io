# Stefano Calcaterra, 405769
# Final Project - Lampada Alfa - Prototype

############################################### FUNZIONE GRID ###############################################

#funzione GRID
from pyplasm import *
import scipy
from  scipy import *
#from lar import *  
					
def larExtrude(model,pattern):
    V,FV = model
    d = len(FV[0])
    offset = len(V)
    m = len(pattern)
    outcells = []
    for cell in FV:
        # create the indices of vertices in the cell "tube"
        tube = [v + k*offset for k in range(m+1) for v in cell]
        # take groups of d+1 elements, via shifting by one
        rangelimit = len(tube)-d
        cellTube = [tube[k:k+d+1] for k in range(rangelimit)]
        outcells += [scipy.reshape(cellTube,newshape=(m,d,d+1)).tolist()]
    outcells = AA(CAT)(TRANS(outcells))
    outcells = [group for k,group in enumerate(outcells) if pattern[k]>0 ]
    coords = list(cumsum([0]+(AA(ABS)(pattern))))
    outVerts = VERTEXTRUDE((V,coords))
    newModel = outVerts, CAT(outcells)
    return newModel


def VERTEXTRUDE((V,coords)):
    """
        Utility function to generate the output model vertices in a multiple extrusion of a LAR model.
        V is a list of d-vertices (each given as a list of d coordinates).
        coords is a list of absolute translation parameters to be applied to V in order
        to generate the output vertices.
        
        Return a new list of (d+1)-vertices.
    """
    return CAT(AA(COMP([AA(AR),DISTR]))(DISTL([V,coords])))

# Questa funzione mi permette di ottenere un dominio simpliciale(triangolare)
def GRID (args):
    model= ([[]],[[0]])
    for k,step in enumerate(args):
        model = larExtrude(model,step*[1])
    V, cells = model
    verts = AA(list)(scipy.array(V)/AA(float)(args))
    return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])

##############################################################################################

#cerchio pieno (con opzione di domini alph a e raggio)
def arc (alpha, r, R) : 
    #dom2D = INTERVALS([[0,alpha],[r,R]])([36,1])
    dom2D = PROD([INTERVALS(alpha)(36), DIFFERENCE([INTERVALS(R)(1),INTERVALS(r)(1)])])
    def mapping (v) : 
        a = v[0]
        r = v[1]
        return [r*COS(a), r*SIN(a)]     
    model = MAP(mapping)(dom2D)
    return model

#sfera
def sfera (alpha, r, R) : 
   
    dom2D = PROD([INTERVALS(alpha)(36), DIFFERENCE([INTERVALS(R)(1),INTERVALS(r)(1)])])
    dom3D = PROD([dom2D, INTERVALS(alpha)(36)])

    def mapping (v) : 
        a = v[0]
        r = v[1]
        a2 = v[2]

        return [r*SIN(a2)*COS(a), r*SIN(a2)*SIN(a), r*COS(a2)]
           
    model = MAP(mapping)(dom3D)
    return model


dom1 = GRID([25,25])

############################## base ##############################

alpha_base = BEZIER(S1)([[0.55,0,0.4],[0.7,0,0.15]])
alpha2_base = BEZIER(S1)([[0.7,0,0.15],[0.7,0,0]])
alpha3_base = BEZIER(S1)([[0,0,0.4],[0.55,0,0.4]])
alpha4_base = BEZIER(S1)([[0,0,0],[0.7,0,0]]);

beta_base = BEZIER(S2)([[0.7,0,0],[0.7,0.95,0],[-0.7,0.95,0],[-0.7,0,0]])

surface1_base = MAP(PROFILEPRODSURFACE([alpha_base, beta_base]))(dom1)
surface1_base_scaled = SCALE([1,2])([1.4,1.4])(surface1_base)

surface2_base = MAP(PROFILEPRODSURFACE([alpha2_base, beta_base]))(dom1)
surface2_base_scaled = SCALE([1,2])([1.4,1.4])(surface2_base)

surface3_base = MAP(PROFILEPRODSURFACE([alpha3_base, beta_base]))(dom1)
surface3_base_scaled = SCALE([1,2])([1.4,1.4])(surface3_base)

surface4_base = MAP(PROFILEPRODSURFACE([alpha4_base, beta_base]))(dom1);
surface4_base_scaled = SCALE([1,2])([1.4,1.4])(surface4_base);

base1 = STRUCT(NN(2)([surface1_base_scaled,R([1,2])(PI)]))
base2 = STRUCT(NN(2)([surface2_base_scaled,R([1,2])(PI)]))
base3 = STRUCT(NN(2)([surface3_base_scaled,R([1,2])(PI)]))
base4 = STRUCT(NN(2)([surface4_base_scaled,R([1,2])(PI)]))


#VIEW(STRUCT([MAP(alpha_base)(dom1),MAP(beta_base)(dom1), base1, base2, base3, base4]))
base = STRUCT([base1, base2, base3, base4])

############################## corpo ##############################

corpo1 = PROD([arc(2*PI, 0, 0.175),Q(0.45)])
corpo2 = PROD([arc(2*PI, 0, 0.1),Q(0.7)])
corpo3 = PROD([arc(2*PI, 0, 0.175),Q(0.5)])
corpo3 = T([3])([2.8])(corpo3)
corpo4 = PROD([arc(2*PI, 0, 0.075),Q(5)])

corpo5 = PROD([arc(2*PI, 0, 0.95),Q(0.1)])
corpo5 = T([3])([3])(corpo5)

corpo6 = PROD([arc(2*PI, 0, 1),Q(0.1)])
corpo6 = T([3])([3.1])(corpo6)

sfera = sfera(2*PI, 0, 0.3);
sfera = T([3])([4.75])(sfera);

corpo = STRUCT([corpo1, corpo2, corpo3, corpo4, corpo5, corpo6, sfera])

############################## paralume ##############################

alpha_paralume = BEZIER(S1)([[0.9,0,3],[1.7,0,2.4],[1.6,0,1.7]])
beta_paralume = BEZIER(S2)([[1.6,0,1.7],[1.6,2.2,1.7],[-1.6,2.2,1.7],[-1.6,0,1.7]])

surface1_paralume = MAP(PROFILEPRODSURFACE([alpha_paralume, beta_paralume]))(dom1)
surface1_paralume_scaled = SCALE([1,2])([0.63,0.63])(surface1_paralume)

paralume = STRUCT(NN(2)([surface1_paralume_scaled,R([1,2])(PI)]))

#VIEW(STRUCT([MAP(alpha_paralume)(dom1),COLOR([1,0,0])(MAP(beta_paralume)(dom1)), paralume1]))

############################## TOTALE ##############################
VIEW(STRUCT([base, corpo, paralume]))
