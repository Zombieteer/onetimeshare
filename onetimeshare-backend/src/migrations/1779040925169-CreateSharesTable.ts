import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSharesTable1779040925169 implements MigrationInterface {
    name = 'CreateSharesTable1779040925169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."macro_region" AS ENUM('usa', 'canada', 'europe', 'uk', 'western_europe', 'eastern_europe', 'nordics', 'brazil', 'mexico', 'argentina', 'chile', 'colombia', 'peru', 'south_america', 'central_america', 'uae', 'middle_east', 'israel', 'africa', 'south_africa', 'russia', 'india', 'south_asia', 'southeast_asia', 'east_asia', 'asia_pacific', 'japan', 'south_korea', 'indonesia', 'australia', 'oceania', 'china')`);
        await queryRunner.query(`CREATE TABLE "shares" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "region" "public"."macro_region" NOT NULL, "encrypted_secret" text NOT NULL, "encryption_key" character varying(512) NOT NULL, "encryption_type" character varying(64) NOT NULL, "ttl" integer NOT NULL, "passphase" character varying(512) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "opened_at" TIMESTAMP WITH TIME ZONE, "expired_at" TIMESTAMP WITH TIME ZONE, "copied_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b88473409066c43c2ccb1894a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shares"`);
        await queryRunner.query(`DROP TYPE "public"."macro_region"`);
    }

}
