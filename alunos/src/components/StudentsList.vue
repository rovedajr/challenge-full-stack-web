<template>
  <v-data-table
    :headers="headers"
    :items="alunos"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Alunos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="750px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              depressed
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Novo Aluno
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              {{warning}}
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nome"
                      label="Nome do Aluno"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  </v-row>
                  <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.ra"
                      label="RA"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.cpf"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="primary"
                depressed
                @click="close"

              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                depressed
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="750px">
          <v-card>
            <v-card-title class="headline">Você tem certeza de que quer excluir esse registro?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="accent" depressed @click="closeDelete">Cancelar</v-btn>
              <v-btn color="accent" depressed @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>


<script>

import Student from '../services/students'

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: false,
          value: 'nome',
        },
        { text: 'email', value: 'email' },
        { text: 'RA', value: 'ra' },
        { text: 'CPF', value: 'cpf' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      alunos: [],
      editedIndex: -1,
      editedItem: {
        nome: '',
        email: '',
        ra: '',
        cpf: '',
      },
      defaultItem: {
        nome: '',
        email: '',
        ra: '',
        cpf: '',
      },
      warning: "",
    }),

     mounted() {
       this.listar()
  },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo aluno' : 'Editar aluno'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.alunos = [
        ]
      },

      listar(){
      Student.list().then(res => {
            this.alunos = res.data;
          })
      },

      editItem (item) {
        this.editedIndex = this.alunos.indexOf(item)
        const {ra, cpf, nome, email} = item
        this.editedItem = Object.assign({}, item)
        console.log(ra, cpf, nome, email);
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.alunos.indexOf(item)
        const {ra} = item
        console.log(ra)
        Student.erase(ra)
        this.listar()
        // this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.alunos.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.warning = ""
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.warning = ""
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.alunos[this.editedIndex], this.editedItem)
        } else {
          Student.save(this.editedItem).then(()=>{
            this.close()
            this.warning = ""
            this.listar()
          }).catch(error =>{
            this.warning = error.response.data.message
          })
        }
      },
    },
  }
</script>