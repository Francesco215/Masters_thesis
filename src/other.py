import matplotlib.pyplot as plt
import numpy as np

from scipy.constants import hbar, e
from scipy.fft import fft
from functools import lru_cache
from scipy.integrate import quad


#pauli matrices
identity = np.array([[1,0],[0,1]]) 
s1 = np.matrix([[0,1],[1,0]])
s2 = np.matrix([[0,-1j],[1j,0]])
s3 = np.matrix([[1,0],[0,-1]])

hall_conductivity=e**2/(2*np.pi*hbar)


def sigma_xy(mu,delta=e):
    #sigma_xy of a material as a function of the chemiacal potential (aka. Fermi energy) and spectral gap delta
    multiplier=(mu>delta)-1*(mu<-delta)
    if multiplier==0: return hall_conductivity

    f_E=np.sqrt(mu**2-delta**2)/mu
    return hall_conductivity*(1-f_E*multiplier)
sigma_xy=np.vectorize(sigma_xy)

sigma_xx=hall_conductivity*(0.5+1e-2) #this is empirical and should be changed from material to material
def sigma(mu,sigma_xx=hall_conductivity/2,delta=e,K=0): #alpha is the valley index
    return sigma_xx*identity-np.array([[0,sigma_xy(mu,delta)],[sigma_xy(mu,delta),0]])*(-1)**K


