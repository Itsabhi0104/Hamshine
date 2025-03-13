export function reportWebVitals(metric) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric)
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production") {
    const body = JSON.stringify(metric)
    const url = "/api/vitals"

    // Use `navigator.sendBeacon()` if available
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body)
    } else {
      // Fall back to fetch
      fetch(url, {
        body,
        method: "POST",
        keepalive: true,
      })
    }
  }
}

export function measureCLS() {
  let clsValue = 0
  let clsEntries = []

  let sessionValue = 0
  let sessionEntries = []

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      // Only count layout shifts without recent user input
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0]
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1]

        // If the entry occurred less than 1 second after the previous entry and
        // less than 5 seconds after the first entry in the session
        if (
          lastSessionEntry &&
          entry.startTime - lastSessionEntry.startTime < 1000 &&
          entry.startTime - firstSessionEntry.startTime < 5000
        ) {
          sessionValue += entry.value
          sessionEntries.push(entry)
        } else {
          sessionValue = entry.value
          sessionEntries = [entry]
        }

        // If the current session value is larger than the current CLS value,
        // update the CLS value and entries
        if (sessionValue > clsValue) {
          clsValue = sessionValue
          clsEntries = sessionEntries

          // Log the updated value (in development)
          if (process.env.NODE_ENV === "development") {
            console.log("CLS:", clsValue)
          }
        }
      }
    }
  }).observe({ type: "layout-shift", buffered: true })
}

