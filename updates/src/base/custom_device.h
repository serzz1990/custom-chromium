#ifndef BASE_CUSTOM_DEVICE_H_
#define BASE_CUSTOM_DEVICE_H_

#include "base/base_export.h"
#include "build/build_config.h"
#include "base/values.h"

namespace base {

class BASE_EXPORT CustomDevice {
  public:
    static CustomDevice* GetInstance();

    int GetScreenProp(std::string prop, int defaultValue) const;
    float GetNavigatorFloatProp(std::string prop, float defaultValue) const;
    std::string GetNavigatorStringProp(std::string prop, std::string defaultValue) const;
    std::string GetNavigatorPlatform() const;
    std::string GetChromeMajorVersion() const;

    bool HasJSON() const;
    bool HasDict(std::string dictKey) const;
    bool HasFont(std::string dictKey) const;

    ~CustomDevice();

  private:
    CustomDevice();
    CustomDevice(CustomDevice const&);
    CustomDevice& operator = (CustomDevice const&);

    static void Init();
    static CustomDevice* instance_;

    void Load();

    absl::optional<base::Value> JSON;

};

}  // namespace base

#endif // BASE_CUSTOM_DEVICE_H_
