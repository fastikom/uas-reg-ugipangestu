<?php

use Illuminate\Database\Seeder;

class MahasiswaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // kita akan menambahkan 10 data dummy
        for ($i=1; $i < 10; $i++){
            DB::table('mahasiswa')->insert([
                'firstName' => str_random(10),
                'lastName' => str_random(10),          
                'description' => str_random(20)             
            ]);
        }
    }
}
