#include "base/custom_device.h"

#include <iostream>
#include <regex.h>
#include <regex>

#include "base/json/json_reader.h"
#include "base/values.h"
#include "base/command_line.h"
#include "base/base_switches.h"

#include "build/build_config.h"

namespace base {

CustomDevice* CustomDevice::instance_ = nullptr;

CustomDevice::CustomDevice() {
  Load();
}

void CustomDevice::Init() {
  instance_ = new CustomDevice();
}

bool CustomDevice::HasJSON() const {
  if (JSON && JSON->is_dict()) {
    return true;
  } else {
    return false;
  }
}

bool CustomDevice::HasDict(std::string dictKey) const {
  if (HasJSON()) {
    const auto* res = JSON->FindKey(dictKey);
    if (res && res->is_dict()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

void CustomDevice::Load() {
  const base::CommandLine& CMD = *base::CommandLine::ForCurrentProcess();
  if (CMD.HasSwitch(switches::kCustomDeviceData)) {
      std::string strJSON = CMD.GetSwitchValueASCII(switches::kCustomDeviceData);
      JSON = base::JSONReader::Read(strJSON);
  }
}

CustomDevice* CustomDevice::GetInstance() {
  if (!instance_) {
    CustomDevice::Init();
  }
  return instance_;
}

int CustomDevice::GetScreenProp(std::string prop, int defaultValue) const {
  if (HasDict("screen")) {
    const auto* screen = JSON->FindKey("screen");
    const auto* propValue = screen->FindKey(prop);
    if (propValue) {
      return propValue->GetInt();
    }
  }
  return defaultValue;
}

float CustomDevice::GetNavigatorFloatProp(std::string prop, float defaultValue) const {
  if (HasDict("navigator")) {
    const auto* navigator = JSON->FindKey("navigator");
    const auto* propValue = navigator->FindKey(prop);
    if (propValue) {
      return propValue->GetInt();
    }
  }
  return defaultValue;
}

std::string CustomDevice::GetNavigatorStringProp(std::string prop, std::string defaultValue) const {
  if (HasDict("navigator")) {
    const auto* navigator = JSON->FindKey("navigator");
    const auto* propValue = navigator->FindKey(prop);
    if (propValue) {
      return propValue->GetString();
    }
  }
  return "";
}

std::string CustomDevice::GetNavigatorPlatform() const {
  std::string result = "";
  if (HasDict("navigator")) {
    const auto* navigator = JSON->FindKey("navigator");
    const auto* propValue = navigator->FindKey("platform");
    if (propValue) {
      result = propValue->GetString();
    }
  }
  return result;
}

std::string CustomDevice::GetChromeMajorVersion() const {
  if (HasDict("navigator")) {
    const auto* navigator = JSON->FindKey("navigator");
    const auto* propValue = navigator->FindKey("userAgent");
    if (propValue) {
      regex_t re;
      regmatch_t pm;
      regcomp(&re, "Chrome\\/[0-9]+", REG_EXTENDED);
      std::string userAgent = propValue->GetString();
      int res = regexec(&re, userAgent.data(), 1, &pm, 0);
      regfree(&re);
      if (res == 0) {
        int start = pm.rm_so + 7;
        int len = pm.rm_eo - pm.rm_so - 7;
        return userAgent.substr(start, len);
      }
    }
  }
  return "";
}

}  // namespace base
