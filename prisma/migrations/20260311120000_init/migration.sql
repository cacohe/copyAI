-- CreateTable
CREATE TABLE "generated_contents" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "platform" VARCHAR(50) NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "keywords" VARCHAR(500),
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "generated_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "avatar_url" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "generated_contents_user_id_created_at_idx" ON "generated_contents"("user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "generated_contents_platform_idx" ON "generated_contents"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_username_key" ON "user_profiles"("username");
