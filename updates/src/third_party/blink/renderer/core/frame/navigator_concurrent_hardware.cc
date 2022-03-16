// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "third_party/blink/renderer/core/frame/navigator_concurrent_hardware.h"

#include "base/system/sys_info.h"
//START-UPDATES
#include "base/custom_device.h"
//END-UPDATES

namespace blink {

unsigned NavigatorConcurrentHardware::hardwareConcurrency() const {
//START-UPDATES
  if (base::CustomDevice::GetInstance()->HasDict("navigator")) {
    return base::CustomDevice::GetInstance()->GetNavigatorFloatProp(
      "hardwareConcurrency",
      base::SysInfo::NumberOfProcessors()
    );
  }
//END-UPDATES
  return static_cast<unsigned>(base::SysInfo::NumberOfProcessors());
}

}  // namespace blink
