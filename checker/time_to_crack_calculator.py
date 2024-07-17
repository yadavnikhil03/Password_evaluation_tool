import re
from .base_strategy import PasswordStrategy

class TimeToCrackCalculator(PasswordStrategy):
    def evaluate(self,password:str)->str:
        charset_size=self._calculate_charset_size(password)
        total_combinations=charset_size**len(password)
        attempts_per_second=1_000_000_000  #this is for high prefernce attacker 

        seconds=total_combinations/attempts_per_second
        return self._convert_seconds_to_readable_time(seconds)

    def _calculate_charset_size(self,password:str)->int:
        charset_size=0
        if re.search(r"[a-z]",password):
            charset_size += 26
        if re.search(r"[A-Z]",password):
            charset_size += 26
        if re.search(r"[0-9]",password):
            charset_size += 10
        if re.search(r"[@$!%*?&#]",password):
            charset_size+=32 #Including a broad set of special characters
        return charset_size

    def _convert_seconds_to_readable_time(self,seconds:float)->str:
        years=seconds//(365*24*3600)
        seconds%=(365*24*3600)
        days=seconds//(24*3600)
        seconds%=(24*3600)
        hours=seconds//3600
        seconds%=3600
        minutes=seconds//60
        seconds%=60
        return f"{int(years)}years,{int(days)}days,{int(hours)} hours,{int(minutes)}minutes,{int(seconds)}seconds"
