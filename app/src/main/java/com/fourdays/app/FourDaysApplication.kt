package com.fourdays.app

import android.app.Application
import com.fourdays.app.common.database.FourDaysDatabase
import com.fourdays.app.common.di.module
import io.github.inflationx.calligraphy3.CalligraphyConfig
import io.github.inflationx.calligraphy3.CalligraphyInterceptor
import io.github.inflationx.viewpump.ViewPump
import org.kodein.di.DKodein
import org.kodein.di.Kodein
import org.kodein.di.KodeinAware
import org.kodein.di.android.androidModule
import org.kodein.di.erased.bind
import org.kodein.di.erased.provider
import org.kodein.di.erased.singleton
import java.util.concurrent.Executor
import java.util.concurrent.Executors


class FourDaysApplication : Application(), KodeinAware {

    override var kodein = Kodein.lazy {
        import(appDependencies())
        import(androidModule(this@FourDaysApplication))
    }

    override fun onCreate() {
        super.onCreate()
        configureCustomFonts()
    }

    fun override(overrideModule: Kodein.Module) {
        kodein = Kodein.lazy {
            import(appDependencies())
            import(androidModule(this@FourDaysApplication))
            import(overrideModule, allowOverride = true)
        }
    }

    private fun appDependencies(): Kodein.Module = module {
        bind<FourDaysDatabase>() with singleton {
            FourDaysDatabase.build(this@FourDaysApplication)
        }
        bind<Executor>() with provider {
            Executors.newCachedThreadPool()
        }
        bind<DKodein>() with provider { this }
    }

    private fun configureCustomFonts() {
        ViewPump.init(
            ViewPump.builder().addInterceptor(
                CalligraphyInterceptor(
                    CalligraphyConfig.Builder().setDefaultFontPath("fonts/AvenirNext-Regular.ttf").build()
                )
            ).build()
        )
    }
}
