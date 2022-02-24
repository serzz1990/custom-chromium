// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "third_party/blink/renderer/core/frame/navigator_concurrent_hardware.h"

#include "base/system/sys_info.h"

// START UPDATES
#include "third_party/blink/public/common/switches.h"
#include "base/command_line.h"
#include "base/strings/string_number_conversions.h"
// END UPDATES

namespace blink {

unsigned NavigatorConcurrentHardware::hardwareConcurrency() const {
  // START UPDATES
  if (base::CommandLine::ForCurrentProcess()->HasSwitch(
            blink::switches::kCustomNavigatorHardwareConcurrency)) {
    std::string str = base::CommandLine::ForCurrentProcess()->GetSwitchValueASCII(blink::switches::kCustomNavigatorHardwareConcurrency);
    int value;
    base::StringToInt(str, &value);
    return value;
  }
  // END UPDATES
  return static_cast<unsigned>(base::SysInfo::NumberOfProcessors());
}

}  // namespace blink
