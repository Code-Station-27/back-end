-- CreateTable
CREATE TABLE "Personal" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainig" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "personal_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personal_user_id_unique" ON "Personal"("user_id");

-- AddForeignKey
ALTER TABLE "Personal" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainig" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainig" ADD FOREIGN KEY ("personal_id") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
