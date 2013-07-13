# Stefano Calcaterra, 405769
# Final Project - Tavolino da pranzo Noguchi - Prototype

############################################### FUNZIONE GRID ###############################################

#funzione GRID
from pyplasm import *
import scipy
from  scipy import*
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

dom1 = GRID([25,25])

############################## piano superiore ##############################
piano_superiore_struct = PROD([arc(2*PI, 0, 6),Q(0.2)])
piano_superiore = T([3])([7.25])(piano_superiore_struct)

############################## base ##############################
alpha = BEZIER(S1)([[1,0,0.4],[1.1,0,0.4],[1.2,0,0.4],[1.3,0,0.4],[1.4,0,0.4],[1.5,0,0.4],[1.5,0,0.4],[1.8,0,0.2],[2.4,0,0.2],[2.5,0,0]])
alpha2 = BEZIER(S1)([[1,0,0],[1,0,0.4]])
alpha3 = BEZIER(S1)([[1,0,0],[2.5,0,0]])
beta = BEZIER(S2)([[2.4,0,0],[2.4,3.05,0],[-2.4,3.05,0],[-2.4,0,0]])

surface1 = MAP(PROFILEPRODSURFACE([alpha,beta]))(dom1)
surface1_scaled = SCALE([1,2])([0.5,0.5])(surface1)

surface2 = MAP(PROFILEPRODSURFACE([alpha2,beta]))(dom1)
surface2_scaled = SCALE([1,2])([0.5,0.5])(surface2)

surface3 = MAP(PROFILEPRODSURFACE([alpha2,beta]))(dom1)
surface3_scaled = SCALE([1,2])([0.5,0.5])(surface3)

base1 = STRUCT(NN(2)([surface1_scaled,R([1,2])(PI)]))
base2 = STRUCT(NN(2)([surface2_scaled,R([1,2])(PI)]))
base3 = STRUCT(NN(2)([surface3_scaled,R([1,2])(PI)]))

#VIEW(STRUCT([MAP(alpha)(dom1),MAP(beta)(dom1), base1, base2]))
base = STRUCT([base1, base2, base3])

############################## corpo ##############################
elemento_corpo_d_struct = PROD([arc(2*PI, 0, 0.03),Q(7.8)])
elemento_corpo_ds1 = STRUCT(NN(2)([elemento_corpo_d_struct,R([1,3])(PI/6)]))
elemento_corpo_ds2 = R([1,3])(-PI/12)(elemento_corpo_ds1)
elemento_corpo_ds = T([2,3])([-1.4,0.4])(R([2,3])(-PI/8)(elemento_corpo_ds2)) #15°

elementi_corpo_tot = STRUCT(NN(7)([elemento_corpo_ds,R([1,2])(PI/3.5)]))

anello_struct = PROD([arc(2*PI, 2.4, 2.5),Q(0.05)])
anello = T([3])([7.20])(anello_struct);
corpo = STRUCT([elementi_corpo_tot, anello]);

#VIEW(STRUCT([piano_superiore, base, elementi_corpo_tot]))

############################## TOTALE ##############################

tavolino = STRUCT([piano_superiore, base, corpo])
VIEW(tavolino)