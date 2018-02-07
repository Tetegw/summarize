# !/usr/bin/env python
# hello world 
print 'hello world!'
print '''
haha
hehe
hengheng
'''


a = 100
if a >= 0:
  print a
else:
  print -a

print 2 > 3

print True and True
print True or False
print not False

print None

PI = 3.1415926
PI = '11'

print PI


for x in [1, 2, 3, 4]:
  print x

y = 98
while y > 100:
  print 'a'
else:
  print 'b'
  

print range(10)


while a <= 10:
    if a > 10:
      break;
    print(a)
    n = n + 1
print 'D'


print '====='
def my_abs(x):
    if x > 0:
      return x
    elif x < 0:
      return -x
print my_abs(1)
print my_abs(-3)


def add_end(L=[]):
    L.append('END')
    return L

print '==add_end==='
print add_end()
print add_end()
  
  
def add_end_(K=None):
    if K is None:
        K = []
    K.append('END')
    return K
print '==add_end_==='
print add_end_()
print add_end_()


print '==calc==='
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
print calc(1, 3, 5, 7)