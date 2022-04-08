import numpy as np

def Lv(width,lv,tan):
    return  np.sqrt(width**2/12 + width*lv*tan/np.tanh(width/(2*lv)))

def R_NL0(x,width,lv,tan):
    #approximation for x close to zero
    return -2*np.log(np.abs(np.tanh(np.pi*x/(2*width))))/(np.pi*(1+tan**2))