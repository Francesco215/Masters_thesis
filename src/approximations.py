import numpy as np

def Lv(width,lv,tan):
    return  np.sqrt(width**2/12 + width*lv*tan/np.tanh(width/(2*lv)))

def approx(x,Lv):
    return np.exp(-x/Lv)/(2*Lv)

def approx1(x,width,lv,tan):
    Lv=lv*np.sqrt(1+tan**2)

    nominator=Lv*np.exp(-np.abs(x)/Lv)
    denominator=2*(1+tan**(-2))

    return nominator/denominator


def approx2(x,width,lv,tan):

    return 4*np.exp(-np.pi*x/width)/(width*np.pi)

def approxp(x,width,lv,tan):
    return approx1(x,width,lv,tan)+ approx2(x,width,lv,tan)