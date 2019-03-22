package com.fourdays.app.setup.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class ForbiddenFoodEntity(
    @PrimaryKey val name: String
)
