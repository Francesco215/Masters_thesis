import numpy as np

def Lv(width,lv,tan):
    return  np.sqrt(lv**2 + width**2/12 + width*lv*tan**2/(np.tanh(width/(2*lv))*2))

def R_NLk0(k,width,lv=1e-6,tan=0.9):
    c2= 2*np.tanh(k*width/2)/(k*width*(1+tan**2))
    c1= 1/(1+(Lv(width,lv,tan)*k)**2)/(1+tan**(-2))
    return c1+c2

def R_NL0(x,width,lv,tan):
    L=Lv(width,lv,tan)
    c1=np.exp(-np.abs(x)/L)/(2*L*(1+tan**(-2)))*width #approximation for x far from 0
    c2= -2*np.log(np.abs(np.tanh(np.pi*x/(2*width))))/(np.pi*(1+tan**2))   #approximation for x close to zero
    return c1+c2