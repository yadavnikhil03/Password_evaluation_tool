import re
from .base_strategy import PasswordStrategy

class PasswordStrengthChecker(PasswordStrategy):
    def evaluate(self,password:str)->str:
        score=0
        if len(password)>=8:
            score+=1
        if re.search(r"[a-z]",password):
            score+=1
        if re.search(r"[A-Z]",password):
            score+=1
        if re.search(r"[0-9]",password):
            score+=1
        if re.search(r"[@$!%*?&#]",password):
            score+=1

        if score<=2:
            return"Weak"
        elif score==3:
            return"Moderate"
        elif score==4:
            return"Strong"
        else:
            return"Very Strong"
