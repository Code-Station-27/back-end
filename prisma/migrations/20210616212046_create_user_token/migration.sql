-- CreateTable
CREATE TABLE "User_Token" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Token_user_id_unique" ON "User_Token"("user_id");

-- AddForeignKey
ALTER TABLE "User_Token" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
