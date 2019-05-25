package com.fourdays.common

import android.content.Intent
import android.support.test.espresso.intent.rule.IntentsTestRule
import com.facebook.react.bridge.ReactMarker
import com.facebook.react.bridge.ReactMarkerConstants
import com.fourdays.MainActivity
import org.junit.Rule

private const val INITIAL_TOUCH_MODE = true
private const val DO_NOT_START_ACTIVITY = false

open class ScreenshotTest {

    @Rule
    @JvmField
    var testRule = IntentsTestRule(
        MainActivity::class.java,
        INITIAL_TOUCH_MODE,
        DO_NOT_START_ACTIVITY
    )

    fun startActivity(): MainActivity {
        val activity = testRule.launchActivity(Intent())
        waitForBundleToLoad()
        activity.sendEvent()
        return activity
    }

    private fun waitForBundleToLoad() {
        var canContinue = false
        ReactMarker.addListener { name, _, _ ->
            canContinue = name == ReactMarkerConstants.CONTENT_APPEARED
        }
        while (!canContinue) {
            Thread.sleep(10)
        }
        // Add a short wait after all as looks like sometimes in a regular emulator
        // and after changes it still takes RN to really really show the content.
        Thread.sleep(10)
    }
}