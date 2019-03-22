package com.fourdays.app.common.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.fourdays.app.setup.database.ForbiddenFoodEntity

@Database(entities = [ForbiddenFoodEntity::class], version = FourDaysDatabase.version)
abstract class FourDaysDatabase : RoomDatabase() {
    companion object {
        const val version = 1
        fun build(context: Context): FourDaysDatabase =
            Room.databaseBuilder(context, FourDaysDatabase::class.java, "fourdays-db")
                .addMigrations(*Migrations.all)
                .build()
    }
}
