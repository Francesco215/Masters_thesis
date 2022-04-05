import numpy as np
from .fourier import *

def R_NLk(k,width,lv=1e-6,tan=0.9):
    if k==0: return 1 #it handles the zero in the denominator at k=0

    
    if k*lv>1e2: omega=k
    else: omega=np.sqrt(k**2+lv**(-2))

    denominator= k*tan**2/np.tanh(omega*width/2)
    
    nominator=2*omega/(k*width)
    denominator += omega/np.tanh(k*width/2)

    return nominator/denominator


def R_NLk_gap(k,width,lv=1e-6,tan=0.9,width_gate=0):
    if width_gate==0: return R_NLk(k,width,lv,tan)
    else: return R_NLk(k,width,lv,tan)*np.sin(k*width_gate/2)/(k*width_gate/2)

R_NLk=np.vectorize(R_NLk)
R_NLk_gap = np.vectorize(R_NLk_gap)