import numpy as np
from functools import lru_cache
from scipy.integrate import quad

from .Rnl import *

@lru_cache(maxsize=50)
def find_lim(f,height=1e-2,*args,**kwargs):
    """
        This function determines for which x the funcition crosses the height
        it has to be monotonically increasing
    """

    k= np.logspace(-30,20,700,base=10)
    R=np.array([f(k,*args,**kwargs) for k in k])
    return k[np.where(R<height)[0][0]]


def R_NLx(x,args,limit=2e2):
    assert isinstance(x,np.ndarray), f'x has to be a numpy array, not {type(x)}'
    
    RNL=np.array([quad(R_NLk,0,limit,args=args,weight='cos',wvar=x) for x in x])/np.pi

    return RNL




#Not working
#@lru_cache(maxsize=5000)
def R_NLx_log(x,args,limit=2e2):
    assert isinstance(x,np.ndarray), f'x has to be a numpy array, not {type(x)}'
    
    def R_NLk_log(k,x,*args):
        return R_NLk(np.exp(k),*args)*k*np.cos(x*np.exp(k))
    
    RNL=np.array([quad(R_NLk_log,-np.inf,np.log(limit),args=(i,*args)) for i in x])

    return RNL