<template>
    <div>
        <nav>
            <div class="nav-wrapper light-blue lighten-4 blue-grey-text left-align">
                <a href="#" class="brand-logo">Dino_bugaini</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a href="#" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import M from 'materialize-css'
    export default {
        name: 'NavBar',
        components: {
            
        },
        mounted: function () {
            this.$nextTick(function () {
                var elems = document.querySelectorAll('.sidenav');
                M.Sidenav.init(elems);
            })
        }
    }
</script>