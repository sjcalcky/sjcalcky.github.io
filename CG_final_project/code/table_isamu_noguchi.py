# Stefano Calcaterra, 405769
# Final Project - Tavolino Isamu Noguchi - Prototype

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

def sdoppia (asse, val, controlpoints):
    array_new = []
    for array in controlpoints:

        x = array[0]
        y = array[1]
        z = array[2]
        if asse == 1:
            array_new.append([x+val,y,z])
        if asse == 2:
            array_new.append([x,y+val,z])
        if asse == 3:
            array_new.append([x,y,z+val])
        
    return array_new


dom1 = GRID([25,25])

############################## piano superiore ##############################

""" #curve di riferimento
x = MAP(BEZIER(S1)([[-6.4,0,0],[6.4,0,0]]))(dom1)
mediana = MAP(BEZIER(S1)([[0,0,0],[0,9.3,0]]))(dom1)
y = MAP(BEZIER(S1)([[-6.4,0,0],[-6.4,9.3,0]]))(dom1)
"""


piano_superiore_struct_s_down = BEZIER(S1)([[0,0,0],[-1,0,0],[-2,0,0],[-16,-1,0],[-1.5,10,0],[0,9.3,0]])
piano_superiore_struct_d_down = BEZIER(S1)([[0,0,0],[1,0,0],[2,0,0],[16,-1,0],[1.5,10,0],[0,9.3,0]])

piano_superiore_struct_s_med = BEZIER(S1)([[0,-0.15,0.1],[-1,-0.15,0.1],[-2,-0.15,0.1],[-16.15,-1,0.1],[-1.5,10.15,0.1],[0,9.45,0.1]])
piano_superiore_struct_d_med = BEZIER(S1)([[0,-0.15,0.1],[1,-0.15,0.1],[2,-0.15,0.1],[16.15,-1,0.1],[1.5,10.15,0.1],[0,9.45,0.1]])

piano_superiore_struct_s_up = BEZIER(S1)([[0,0,0.2],[-1,0,0.2],[-2,0,0.2],[-16,-1,0.2],[-1.5,10,0.2],[0,9.3,0.2]])
piano_superiore_struct_d_up = BEZIER(S1)([[0,0,0.2],[1,0,0.2],[2,0,0.2],[16,-1,0.2],[1.5,10,0.2],[0,9.3,0.2]])

surf_down = MAP(BEZIER(S2)([piano_superiore_struct_s_down,piano_superiore_struct_d_down]))(dom1)
surf_up = MAP(BEZIER(S2)([piano_superiore_struct_d_up,piano_superiore_struct_s_up]))(dom1)

surf_lat1 = MAP(BEZIER(S2)([piano_superiore_struct_s_up, piano_superiore_struct_s_med, piano_superiore_struct_s_down]))(dom1)
surf_lat2 = MAP(BEZIER(S2)([piano_superiore_struct_d_down,piano_superiore_struct_d_med, piano_superiore_struct_d_up]))(dom1)

surf_tot = STRUCT([surf_down, surf_up, surf_lat1, surf_lat2])
#VIEW(surf_tot)

piano = T([3])([4])(surf_tot)

############################## base ##############################
""" #curve di riferimento
x1 = MAP(BEZIER(S1)([[0,0,0],[8,0,0]]))(dom1)
x2 = MAP(BEZIER(S1)([[0,0,4],[8,0,4]]))(dom1)
y1 = MAP(BEZIER(S1)([[0,0,0],[0,0,4]]))(dom1) 
y2 = MAP(BEZIER(S1)([[8,0,0],[8,0,4]]))(dom1)
"""

# punti curve sinistra
cp1_s = [[0.25,0,0],[-0.5,0,1.25],[0.7,0,4]]
cp2_s = [[0.7,0,4],[1.25,0,4]]
cp3_s = [[1.25,0,4],[1.8,0,1.5],[2,0,1.5],[2.2,0,1.25],[3,0,1],[4.5,0,0.75],[5.75,0,0.75],[6.2,0,1],[6.7,0,1.5],[6.75,0,2]]
cp4_s = [[6.75,0,2],[7.25,0,2]]
cp5_s = [[7.25,0,2],[8.5,0,0.75],[7.75,0,0]]

# punti curve base sinistra
cp_b_1_s = [[0.25,0,0],[0.75,0,0]]
cp_b_2_s = [[0.75,0,0],[1.25,0,0]]
cp_b_3_s = [[1.25,0,0],[6.75,0,0]]
cp_b_4_s = [[6.75,0,0],[7.25,0,0]]
cp_b_5_s = [[7.25,0,0],[7.75,0,0]]

# punti curve destra
cp1_d = sdoppia(2,0.4,cp1_s)
cp2_d = sdoppia(2,0.4,cp2_s)
cp3_d = sdoppia(2,0.4,cp3_s)
cp4_d = sdoppia(2,0.4,cp4_s)
cp5_d = sdoppia(2,0.4,cp5_s)

# punti curve base destra
cp_b_1_d = sdoppia(2,0.4,cp_b_1_s)
cp_b_2_d = sdoppia(2,0.4,cp_b_2_s)
cp_b_3_d = sdoppia(2,0.4,cp_b_3_s)
cp_b_4_d = sdoppia(2,0.4,cp_b_4_s)
cp_b_5_d = sdoppia(2,0.4,cp_b_5_s)

# punti curve mediane (per l'effetto bombato della superficie laterale)
cp1_med = [[0.25,0.2,0],[-1,0.2,1.25],[0.7,0.2,4]]
cp3_med = [[1.25,0.2,4],[2.3,0.2,1.5],[2.5,0.2,2],[2.7,0.2,1.5],[3,0.2,1.5],[4.5,0.2,1.75],[5.75,0.2,1.25],[6.2,0.2,1.5],[6.7,0.2,2],[6.75,0.2,2]]
cp5_med = [[7.25,0.2,2],[9.25,0.2,0.75],[7.75,0.2,0]]
 
""" //per visualizzare le curve
c1_s = MAP(BEZIER(S1)(cp1_s))(dom1)
c2_s = MAP(BEZIER(S1)(cp2_s))(dom1)
c3_s = MAP(BEZIER(S1)(cp3_s))(dom1)
c4_s = MAP(BEZIER(S1)(cp4_s))(dom1)
c5_s = MAP(BEZIER(S1)(cp5_s))(dom1)

c1_d = MAP(BEZIER(S1)(cp1_d))(dom1)
c2_d = MAP(BEZIER(S1)(cp2_d))(dom1)
c3_d = MAP(BEZIER(S1)(cp3_d))(dom1)
c4_d = MAP(BEZIER(S1)(cp4_d))(dom1)
c5_d = MAP(BEZIER(S1)(cp5_d))(dom1)
"""

# curve sinistra
c1_s = BEZIER(S1)(cp1_s)
c2_s = BEZIER(S1)(cp2_s)
c3_s = BEZIER(S1)(cp3_s)
c4_s = BEZIER(S1)(cp4_s)
c5_s = BEZIER(S1)(cp5_s)

# curve base sinistra
b1_s = BEZIER(S1)(cp_b_1_s)
b2_s = BEZIER(S1)(cp_b_2_s)
b3_s = BEZIER(S1)(cp_b_3_s)
b4_s = BEZIER(S1)(cp_b_4_s)
b5_s = BEZIER(S1)(cp_b_5_s)
b_tot_s = BEZIER(S1)([[0.25,0,0],[7.75,0,0]])

# curve destra
c1_d = BEZIER(S1)(cp1_d)
c2_d = BEZIER(S1)(cp2_d)
c3_d = BEZIER(S1)(cp3_d)
c4_d = BEZIER(S1)(cp4_d)
c5_d = BEZIER(S1)(cp5_d)

# curve base destra
b1_d = BEZIER(S1)(cp_b_1_d)
b2_d = BEZIER(S1)(cp_b_2_d)
b3_d = BEZIER(S1)(cp_b_3_d)
b4_d = BEZIER(S1)(cp_b_4_d)
b5_d = BEZIER(S1)(cp_b_5_d)
b_tot_d = BEZIER(S1)([[0.25,0.4,0],[7.75,0.4,0]])

# curve mediane (per l'effetto bombato della superficie laterale)
med1 = BEZIER(S1)(cp1_med)
med3 = BEZIER(S1)(cp3_med)
med5 = BEZIER(S1)(cp5_med)


#VIEW(STRUCT([x1,x2,y1,y2,c1_s,c2_s,c3_s,c4_s,c5_s,c1_d,c2_d,c3_d,c4_d,c5_d]))

# superfici parziali sinistra
s1_s = MAP(BEZIER(S2)([b1_s,c1_s]))(dom1)
s2_s = MAP(BEZIER(S2)([b2_s,c2_s]))(dom1)
s3_s = MAP(BEZIER(S2)([b3_s,c3_s]))(dom1)
s4_s = MAP(BEZIER(S2)([b4_s,c4_s]))(dom1)
s5_s = MAP(BEZIER(S2)([b5_s,c5_s]))(dom1)

# superficie sinistra intera
sup_s = STRUCT([s1_s,s2_s,s3_s,s4_s,s5_s])

# superfici parziali destra
s1_d = MAP(BEZIER(S2)([c1_d,b1_d]))(dom1)
s2_d = MAP(BEZIER(S2)([c2_d,b2_d]))(dom1)
s3_d = MAP(BEZIER(S2)([c3_d,b3_d]))(dom1)
s4_d = MAP(BEZIER(S2)([c4_d,b4_d]))(dom1)
s5_d = MAP(BEZIER(S2)([c5_d,b5_d]))(dom1)

# superficie destra intera
sup_d = STRUCT([s1_d,s2_d,s3_d,s4_d,s5_d])

# superfici parziali laterali
lat1 = MAP(BEZIER(S2)([c1_s,med1,c1_d]))(dom1)
lat2 = MAP(BEZIER(S2)([c2_s,c2_d]))(dom1)
lat3 = MAP(BEZIER(S2)([c3_s,med3,c3_d]))(dom1)
lat4 = MAP(BEZIER(S2)([c4_s,c4_d]))(dom1)
lat5 = MAP(BEZIER(S2)([c5_s,med5,c5_d]))(dom1)
lat6 = MAP(BEZIER(S2)([b_tot_d,b_tot_s]))(dom1)

# superficie laterale intera
lat_tot = STRUCT([lat1,lat2,lat3,lat4,lat5,lat6])

# singolo elemento base
elemento_base = STRUCT([sup_s,sup_d,lat_tot])

## assemblaggio base ##
base1 = T([1,2])([1.75-6.4-0.25,1.75])(R([1,2])(PI/4)(elemento_base))
elemento_base_ribaltato = R([2,3])(PI)(elemento_base)
base2 = T([1,2,3])([4.7,1.75,4])(R([1,2])(3*PI/4)(elemento_base_ribaltato))

#VIEW(STRUCT([base1,base2,x,y,mediana]))

# base completa
base = STRUCT([base1,base2])

############################## totale ##############################
VIEW(STRUCT([piano,base]))
