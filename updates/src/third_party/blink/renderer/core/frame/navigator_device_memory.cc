// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "third_party/blink/renderer/core/frame/navigator_device_memory.h"

#include "third_party/blink/public/common/device_memory/approximated_device_memory.h"
#include "third_party/blink/public/common/privacy_budget/identifiability_metrics.h"
#include "third_party/blink/public/common/privacy_budget/identifiability_metric_builder.h"
#include "third_party/blink/public/mojom/web_feature/web_feature.mojom-shared.h"
#include "third_party/blink/renderer/core/dom/document.h"
#include "third_party/blink/renderer/core/frame/local_dom_window.h"
//START-UPDATES
#include "base/custom_device.h"
//END-UPDATES

namespace blink {

float NavigatorDeviceMemory::deviceMemory() const {
//START-UPDATES
  if (base::CustomDevice::GetInstance()->HasDict("navigator")) {
    return base::CustomDevice::GetInstance()->GetNavigatorFloatProp(
      "deviceMemory",
      ApproximatedDeviceMemory::GetApproximatedDeviceMemory()
    );
  }
//END-UPDATES
  return ApproximatedDeviceMemory::GetApproximatedDeviceMemory();
}

}  // namespace blink
