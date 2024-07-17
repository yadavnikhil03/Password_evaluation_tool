from abc import ABC, abstractmethod

class PasswordStrategy(ABC):
    @abstractmethod
    def evaluate(self,password:str)->str:
        pass
