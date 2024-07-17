from .strength_checker import PasswordStrengthChecker
from .time_to_crack_calculator import TimeToCrackCalculator

class StrategyFactory:
    @staticmethod
    def get_strategy(strategy_type: str):
        if strategy_type=="strength":
            return PasswordStrengthChecker()
        elif strategy_type=="time_to_crack":
            return TimeToCrackCalculator()
        else:
            raise ValueError("Unknown strategy type")
