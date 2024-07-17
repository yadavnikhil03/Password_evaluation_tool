class Settings:
    _instance=None

    def __new__(cls):
        if cls._instance is None:
            cls._instance= super(Settings,cls).__new__(cls)
            #configuration settings
            cls._instance.config={
                "some_setting":"value"
            }
        return cls._instance

    def get_setting(self,key):
        return self._instance.config.get(key)
