# Stefano Calcaterra, 405769
# Final Project - sedia Toga - Prototype


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

dom1 = GRID([25,25])

##############################  ##############################

c1 = BEZIER(S1)([[-3,0,0],[-2.5,0,3],[-2.8,0,6],[0,0,1],[0,0,1],[2.8,0,6],[2.5,0,3],[3,0,0]])
c2 = BEZIER(S1)([[-4.2,0.2,0],[-4.2,0.2,7],[-2.5,0.2,7],[-2.5,0.2,4],[-2.5,0.2,4],[-2.5,0.2,4],[-2.5,0.2,4],[0,0,2],[2.5,0.2,4],[2.5,0.2,4],[2.5,0.2,4],[2.5,0.2,4],[2.5,0.2,7],[4.2,0.2,7],[4.2,0.2,0]])
c3 = BEZIER(S1)([[-4.5,1,0],[-4.2,1,7],[-2.5,1,7],[-2.5,1,4],[-2.5,1,4],[-2.5,1,4],[-2.5,1,4],[0,1,2],[2.5,1,4],[2.5,1,4],[2.5,1,4],[2.5,1,4],[2.5,1,7],[4.2,1,7],[4.5,1,0]])
c4 = BEZIER(S1)([[-4.1,4,0],[-3.7,4,5],[-3,4,5],[-3,4,3.5],[-3,4,3.5],[-3,4,3.5],[-3,4,3.5],[0,4,2],[3,4,3.5],[3,4,3.5],[3,4,3.5],[3,4,3.5],[3,4,5],[3.7,4,5],[4.1,4,0]])
c5 = BEZIER(S1)([[-3.9,4.5,0],[-3,4.5,6],[-3,4.5,6],[-3,4.5,6],[0,6,5.5],[0,6,5.5],[3,4.5,6],[3,4.5,6],[3,4.5,6],[3.9,4.5,0]])
c6 = BEZIER(S1)([[-3.9,5,0],[-3,5,7.5],[-3,5,7.5],[-3,5,7.5],[0,5,5.5],[3,5,7.5],[3,5,7.5],[3,5,7.5],[3.9,5,0]])
c7 = BEZIER(S1)([[-3.6,6.5,0],[-3,6,7.5],[-3,6,7.5],[-3,6,7.5],[0,6,5.5],[3,6,7.5],[3,6,7.5],[3,6,7.5],[3.6,6.5,0]])
c8 = BEZIER(S1)([[-3,6.5,0],[-2,6,6.5],[-2,6,6.5],[-2,6,6.5],[0,6,4.5],[2,6,6.5],[2,6,6.5],[2,6,6.5],[3,6.5,0]])

"""
mc1 = MAP(c1)(dom1)
mc2 = MAP(c2)(dom1)
mc3 = MAP(c3)(dom1)
mc4 = MAP(c4)(dom1)
mc5 = MAP(c5)(dom1)
mc6 = MAP(c6)(dom1)
mc7 = MAP(c7)(dom1)
mc8 = MAP(c8)(dom1)

s1 = POLYLINE([[-3,0,0],[-2.5,0,3.4],[2.5,0,3.4],[3,0,0]])
s2 = POLYLINE([[-4.2,0.2,0],[-3.9,0.2,6],[3.9,0.2,6],[4.2,0.2,0]])
s3 = POLYLINE([[-3.8,5,0],[-2.5,5,8],[2.5,5,8],[3.8,5,0]])

struttura = STRUCT([s1,s2,s3])
s = COLOR([1,0,0])(STRUCT([struttura, mc1, mc2, mc3, mc4, mc5, mc6, mc7, mc8]))

VIEW(s)
"""

surf = MAP(BEZIER(S2)([c1, c2,c2,c2, c3, c4, c4, c4, c4, c4, c4, c4, c5,c5,c5, c6,c6,c6,c6,c6,c6, c7, c7, c7, c8]))(dom1)

VIEW(surf)



