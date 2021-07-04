<template>
  <q-page>
    <div class="q-pa-xl">
      <q-table
        title="Estados"
        :data="rows"
        :columns="columns"
        row-key="id"
        :loading="loading"
      >
        <template v-slot:top-right>
          <q-btn icon="add" color="secondary" label="Adicionar" @click="create" />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <template v-for="(col) in props.cols">
              <q-td v-if="col.name != 'options'" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
              <q-td v-if="col.name == 'options'" :key="col.name" :props="props" auto-width>
                <q-btn-group class="no-shadow">
                  <q-btn text-color="warning" size="md" icon="edit" @click="edit(props.row.id)" hint="Editar" />
                  <q-btn text-color="negative" size="md" icon="delete" @click="showModalDelete = !showModalDelete; id=props.row.id" hint="Excluir" />
                </q-btn-group>
              </q-td>
            </template>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="showModalDelete">
      <q-card>
        <q-card-section>
          Deseja realmente excluir este registro?
        </q-card-section>
        <q-separator/>
        <q-card-actions align="center">
          <q-btn color="grey" @click="showModalDelete = false">Não</q-btn>
          <q-btn color="red" @click="remove()">Sim</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showFormModal">
      <q-card v-if="showFormModal" class="q-pa-md" style="width: 700px; max-width: 80vw; background-color: #fff;">
        <q-form @submit="save()">
          <q-card-section>
            <q-input v-model="formData.nome" label="Nome" type="text" :rules="[value => value && value.length > 0 || 'Favor digitar um nome']" maxlength="60"/>
            <q-input v-model="formData.uf" label="Sigla" type="text" :rules="[value => value && value.length > 0 || 'Favor digitar uma sigla']" maxlength="2"/>
          </q-card-section>
          <q-separator/>
          <q-card-actions align="right">
            <q-btn color="red" @click="close" label="Cancelar"/>
            <q-btn color="primary" type="submit" label="Salvar" class="q-ml-sm" :loading="submitting"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'estadoListPage',
  data() {
    return {
      loading: false,
      rows: [],
      columns: [
        { name: "id", label: "#", align: "center", field: row => row.id, sortable: true },
        { name: "nome", label: "Nome", align: "left", field: row => row.nome, sortable: true },
        { name: "uf", label: "UF", align: "left", field: row => row.uf, sortable: true },
        { name: 'options', align: 'left', label: 'Ações', sortable: false },
      ],
      formData: {
        nome: '',
        uf: '',
      },
      showFormModal: false,
      showModalDelete: false,
      submitting: false,
    };
  },

  methods: {
    request() {
      this.loading = true;

      this.$store.dispatch('estado/list')
        .then(() => {
          this.rows = this.$store.getters['estado/list'];
        })
        .catch(() => {
          console.log('erro');
        })
        .finally(() => {
          this.loading = false;
        });
    },

    execRequest() {
      this.rows = [];
      this.request();
    },

    create() {
      this.$q.loading.show();

      this.formData = {
        nome: '',
        uf: '',
      };

      this.showFormModal = true;

      this.$q.loading.hide();
    },

    edit(id) {
      this.$q.loading.show();

      this.$store.dispatch('estado/show', id).then(() => {
        this.formData = Object.assign({}, this.$store.getters['estado/byId']);
        this.showFormModal = true;
      }).catch(() => {
        this.$q.notify({
          color  : 'negative',
          message: 'Erro ao buscar dados. Tente novamente mais tarde.',
        });
      }).finally(() => {
        this.$q.loading.hide();
      });
    },

    save() {
      this.submitting = true;
      this.$q.loading.show();

      const methodAction = this.formData.id ? 'edit' : 'insert';

      this.$store.commit('estado/setData', { data: this.formData });
      this.$store.dispatch(`estado/${methodAction}`).then(() => {
        this.$q.notify({
          color  : 'positive',
          message: 'Operação Realizada com Sucesso',
        });
        this.execRequest();
        this.showFormModal = false;
      }).catch(() => {
        this.$q.notify({
          color  : 'negative',
          message: 'Erro ao salvar dados. Tente novamente mais tarde.',
        });
      }).finally(() => {
        this.$q.loading.hide();
        this.submitting = false;
      });
    },

    remove() {
      this.$q.loading.show();

      const methodAction = 'destroy';

      this.$store.dispatch(`estado/${methodAction}`, this.id).then(() => {
        this.$q.notify({
          color  : 'positive',
          message: 'Registro Excluído com sucesso',
        });

        this.showModalDelete = false;

        this.execRequest();
      }).catch(() => {
        this.showModalDelete = false;
        this.$q.notify({
          color  : 'negative',
          message: 'Erro ao excluir dados. Tente novamente mais tarde.',
        });
      }).finally(() => {
        this.$q.loading.hide();
      });
    },

    close() {
      this.showFormModal = false;
    },
  },

  async mounted() {
    this.execRequest();
  },
}
</script>
