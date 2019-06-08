export class Etapa2 {
    constructor(
        public id_peri: number,
        public id_num_sap: number,
        public infoGeneral: InfoGeneral,
        public infoEspecifica: InfoEspecifica[]
    ) {}

}

export class InfoGeneral {
    constructor(
        public infg_area_desarrollo?: string,
        public infg_area_desarrollo_ajuste_comp?: string,
        public infg_busqueda_desafio?: string,
        public infg_busqueda_desafio_ajuste_com?: string
    ) {}

}

export class InfoEspecifica {
    constructor(
        public ID: number,
        public id_car: number,
        public infe_car_tabla123?: string,
        public infe_comp_1?: string,
        public infe_comp_2?: string,
        public infe_comp_3?: string,
        public infe_comp_4?: string,
        public infe_comp_5?: string,
        public infe_comp_6?: string,
        public infe_cond_jornada?: string,
        public infe_cond_otro?: string,
        public infe_mision?: string,
        public infe_mova_1?: string,
        public infe_mova_2?: string,
        public infe_mova_3?: string,
        public infe_mova_4?: string,
        public infe_mova_5?: string,
        public infe_req_cono?: string,
        public infe_req_esp?: string,
        public infe_req_exp_esp?: string,
        public infe_req_exp_esp_anyo?: string,
        public infe_req_exp_general?: string,
        public infe_req_exp_general_anyo?: string,
        public infe_req_exp_lider_anyo?: string,
        public infe_req_form?: string,
        public infe_req_otro?: string,
        public infe_rotacion?: string

    ) {}

}

export class Cargo {
    constructor(
        public ID: number,
        public car_nombre: string,
        public car_direccion: string,
    ) {}

}